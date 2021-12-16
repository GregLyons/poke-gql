const {db} = require('./db.js');
const {
  computeJunctionTableQueryString,
  entityNameToTableName,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
} = require('./helpers.js');

module.exports = {
  db,

  computeJunctionTableQueryString,
  entityNameToTableName,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
};