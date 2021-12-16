const {db} = require('./db.js');
const {
  entityNameToTableName,
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
  entityNameToTableName,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
};