const {db} = require('./db.js');
const {
  computeJunctionTableName,
  entityNameToTableName,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
} = require('./helpers.js');

module.exports = {
  db,

  computeJunctionTableName,
  entityNameToTableName,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
};