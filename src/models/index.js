const {db} = require('./db.js');
const {
  entityNameToTableName,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
} = require('./helpers.js');

module.exports = {
  db,

  entityNameToTableName,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
};