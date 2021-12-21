const {db} = require('./db.js');
const {
  entityNameToTableName,
  escapeObjectParameters,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
} = require('./helpers.js');

const {
  getEntityQueryString,
  getEntityByColumnQueryString,
} = require('./basicQueries.js');

const {
  computeJunctionTableQueryString,
} = require('./junctionTableQueries.js');

const {
  computeGenerationTableQueryString,
} = require('./generationQueries.js');

module.exports = {
  db,

  computeGenerationTableQueryString,
  computeJunctionTableQueryString,
  escapeObjectParameters,
  entityNameToTableName,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
  getEntityQueryString,
  getEntityByColumnQueryString,
};