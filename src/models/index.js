const {db} = require('./db.js');
const {
  entityNameToTableName,
  escapeObjectParameters,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
} = require('./helpers.js');

const {
  computeJunctionTableQueryString,
} = require('./junctionTables.js');

const {
  computeGenerationTableQueryString,
} = require('./generation.js');

module.exports = {
  db,

  computeGenerationTableQueryString,
  computeJunctionTableQueryString,
  escapeObjectParameters,
  entityNameToTableName,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
};