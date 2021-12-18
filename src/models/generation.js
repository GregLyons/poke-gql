const {
  entityNameToTableName,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
} = require('./helpers.js');

const computeGenerationTableQueryString = (presence, tableName, pagination, filter, countMode) => {
  // If the entity doesn't change across generations, then the database only stores one instance of that entity. To determine the presence of such an entity in a given generation, we check whether the debut gen of that entity is less than or eqal to the given generation.
  const genDependent = hasGenID(tableName);

  // Extract pagination fields.
  const paginationString = getPaginationQueryString(pagination, tableName);
  const filterString = getFilterQueryString(filter, tableName);

  console.log(presence, genDependent);
  console.log(presence && genDependent ? 'generation_id' : 'introduced')

  return countMode 
    ? `
      SELECT generation_id, COUNT(*) as row_count FROM ${tableName}
      WHERE ${presence && genDependent ? 'generation_id' : 'introduced'} IN ?
      ${filterString}
      ${paginationString}
      GROUP BY generation_id
    ` : `
      SELECT * FROM ${tableName}
      WHERE ${presence && genDependent ? 'generation_id' : 'introduced'} IN ?
      ${filterString}
      ${paginationString}
    `;
}

module.exports = {
  computeGenerationTableQueryString,
};