const chokidar = require('chokidar');
const path = require('path');
const cluster = require('cluster');
const { getAvailablePort } = require('leemons-utils/lib/port');
const chalk = require('chalk');
const { Leemons } = require('../index');
const loadFront = require('../core/plugins/front/loadFront');

function createWorker(env = {}) {
  const newWorker = cluster.fork(env);
  newWorker.process.env = env;
  return newWorker;
}

function handleStdin(PORT) {
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (data) => {
    switch (data.toString().trim()) {
      case 'restart':
      case 'reload':
      case 'rs':
        console.log(chalk`{green Reloading\n}`);
        Object.values(cluster.workers).forEach((worker) => {
          worker.send('kill');
        });
        createWorker({ PORT });
        break;
      default:
    }

    if (data.charCodeAt(0) === 12) {
      console.clear();
    }
  });
}

function createReloader(name, dirs, config, handler) {
  let isReloading = false;
  let requestedReloads = 0;
  let lastTimer = null;

  const watcher = chokidar.watch(dirs, config);

  const watcherHandler = (event, filename) => {
    requestedReloads++;

    const handledRequests = requestedReloads;

    const timer = setTimeout(() => {
      if (lastTimer !== timer) {
        clearTimeout(timer);
        return;
      }

      if (!isReloading) {
        isReloading = true;
        console.log(chalk`Reloading ${name} due to {magenta ${handledRequests}} changes`);
        handler().then(() => {
          requestedReloads -= handledRequests;
          console.log(
            chalk`Reloaded ${name} due to {magenta ${handledRequests} changes}. {red ${requestedReloads} changes remaining}`
          );
          if (lastTimer === timer) {
            lastTimer = null;
          }
          if (requestedReloads < 0) {
            requestedReloads = 0;
          } else if (requestedReloads > 0 && lastTimer != null) {
            requestedReloads--;
            watcherHandler(event, filename);
          }
          isReloading = false;
        });
      }
    }, 500);

    lastTimer = timer;
  };

  watcher.on('all', watcherHandler);
}

async function setupFront(leemons, plugins, nextDir) {
  // Frontend directories to watch for changes
  const frontDirs = [
    // App next/** directories
    path.join(
      path.isAbsolute(leemons.dir.next)
        ? leemons.dir.next
        : path.join(leemons.dir.app, leemons.dir.next),
      '**'
    ),
    // Plugin next/** directories
    ...plugins.map((plugin) =>
      path.join(
        path.isAbsolute(plugin.dir.next)
          ? plugin.dir.next
          : path.join(plugin.dir.app, plugin.dir.next),
        '**'
      )
    ),
  ];

  // Make first front load
  await leemons.loadFront(plugins);

  // Create a file watcher
  createReloader(
    'Frontend',
    frontDirs,
    {
      ignoreInitial: true,
      ignored: [
        /(^|[/\\])\../, // ignore dotfiles
        /.*node_modules.*/,
        /*
         * Ignore:
         *  next/dependencies
         *  next/plugins
         *  next/pages
         *  next/jsconfig.json
         */
        `${nextDir}/(dependencies|plugins|pages|jsconfig.json)/**`,
        /.*checksums.json.*/,
      ],
    },
    // When a change occurs, reload front
    () => loadFront(leemons, plugins)
  );
}

async function setupBack(leemons, plugins) {
  /*
   * Backend directories to watch for changes
   *  plugin.dir.models
   *  plugin.dir.controllers
   *  plugin.dir.services
   */
  const backDirs = plugins.map((plugin) =>
    path.join(
      plugin.dir.app,
      `\
(${plugin.dir.models}|\
${plugin.dir.controllers}|\
${plugin.dir.services})`,
      '**'
    )
  );

  // Load backend for first time
  await leemons.loadBack(plugins);

  // Create a backend watcher
  createReloader(
    'Backend',
    backDirs,
    {
      ignoreInitial: true,
      ignored: [
        /(^|[/\\])\../, // ignore dotfiles
        /.*node_modules.*/,
      ],
    },
    /*
     * When a change occurs, remove backend router endpoints
     * and load back again
     */
    () => {
      // eslint-disable-next-line no-param-reassign
      leemons.backRouter.stack = [];
      return leemons.loadBack(plugins);
    }
  );
}

module.exports = async ({ next }) => {
  const cwd = process.cwd();

  const nextDir = next && path.isAbsolute(next) ? next : path.join(cwd, next || 'next/');
  process.env.next = nextDir;

  if (cluster.isMaster) {
    process.title = 'Leemons Dev';

    const configDir = process.env.CONFIG_DIR || 'config';
    const paths = [
      // Application config directory
      configDir,
      // Application package.json
      path.join(cwd, 'package.json'),
      // ignore leemons plugins and connectors
      path.join(__dirname, '../../../leemons-!(plugin|connector)**'),
      path.join(__dirname, '../../../leemons/**'),
    ];
    const PORT = await getAvailablePort();

    cluster.on('message', (worker, message) => {
      switch (message) {
        case 'kill':
          worker.kill();
          break;
        default:
      }
    });

    handleStdin(PORT);

    createReloader(
      'Leemons',
      paths,
      {
        cwd,
        ignored: /(^|[/\\])\../, // ignore dotfiles
        ignoreInitial: true,
      },
      // When a change is detected, kill all the workers and fork a new one
      async () => {
        Object.values(cluster.workers).forEach((worker) => {
          worker.send('kill');
        });
        createWorker({ PORT });
      }
    );

    createWorker({ PORT });
  } else if (cluster.isWorker) {
    process.title = 'Leemons Dev Instance';
    process.env.NODE_ENV = 'development';

    const leemons = new Leemons(console.log);

    cluster.worker.on('message', (message) => {
      switch (message) {
        case 'kill':
          leemons.server.destroy(() => {
            process.send('kill');
          });
          break;
        default:
      }
    });

    await leemons.loadAppConfig();
    const pluginsConfig = await leemons.loadPluginsConfig();

    await Promise.all([
      setupFront(leemons, pluginsConfig, nextDir),
      setupBack(leemons, pluginsConfig),
    ]);

    leemons.loaded = true;
    await leemons.start();
  }
};
