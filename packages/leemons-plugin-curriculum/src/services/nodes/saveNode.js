const _ = require('lodash');
const { table } = require('../tables');
const { setDatasetValues } = require('./setDatasetValues');
const { updateNodeLevelFormPermissions } = require('../nodeLevels/updateNodeLevelFormPermissions');
const { recalculeAllIndexes } = require('../curriculum/recalculeAllIndexes');
const {
  updateUserAgentPermissionsByUserSession,
} = require('../configs/updateUserAgentPermissionsByUserSession');

async function saveNode(
  nodeId,
  userSession,
  { datasetValues, ...rest },
  { transacting: _transacting } = {}
) {
  return global.utils.withTransaction(
    async (transacting) => {
      const node = await table.nodes.findOne({ id: nodeId }, { transacting });

      await table.nodes.update({ id: nodeId }, rest, { transacting });

      // TODO Cambiar a que cuando se guarde los campos ya se guarden con los permisos correctos si no toca recalcular cada vez
      await updateNodeLevelFormPermissions(node.nodeLevel, { transacting });
      await updateUserAgentPermissionsByUserSession(userSession, { transacting });
      await setDatasetValues(node, userSession, datasetValues, { transacting });
      await recalculeAllIndexes(node.curriculum, userSession, { transacting });
    },
    table.nodes,
    _transacting
  );
}

module.exports = { saveNode };
