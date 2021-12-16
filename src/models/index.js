const {db} = require('./db.js');
const {
  computeJunctionTableName,
  entityNameToTableName,
  getDataFromJunctionTable,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
} = require('./helpers.js');

module.exports = {
  db,

  computeJunctionTableName,
  entityNameToTableName,
  getDataFromJunctionTable,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
};