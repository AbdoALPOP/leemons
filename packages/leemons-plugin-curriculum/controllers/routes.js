// TODO [Importante]: Añadir autenticación y permisos
module.exports = [
  // Curriculum
  {
    path: '/curriculum',
    method: 'POST',
    handler: 'curriculum.postCurriculum',
    authenticated: true,
  },
  {
    path: '/curriculum',
    method: 'GET',
    handler: 'curriculum.listCurriculum',
    authenticated: true,
  },
  {
    path: '/curriculum/:id/generate',
    method: 'POST',
    handler: 'curriculum.generateCurriculum',
    authenticated: true,
  },
  {
    path: '/curriculum/:id',
    method: 'GET',
    handler: 'curriculum.getCurriculum',
    authenticated: true,
  },
  // NodeLevels
  {
    path: '/node-levels',
    method: 'POST',
    handler: 'nodeLevel.postNodeLevels',
    authenticated: true,
  },
  // Nodes
  {
    path: '/node',
    method: 'POST',
    handler: 'nodes.postNode',
    authenticated: true,
  },
  {
    path: '/node/:id/form-values',
    method: 'POST',
    handler: 'nodes.saveNodeFormValues',
    authenticated: true,
  },
];
