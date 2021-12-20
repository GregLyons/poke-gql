const {
  escapeObjectParameters,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
} = require('./helpers.js');

const computeGenerationTableQueryString = (presence, tableName, pagination, filter, countMode) => {
  // Escape object parameters that are strings.
  escapeObjectParameters(pagination);
  escapeObjectParameters(filter);

  // If the entity doesn't change across generations, then the database only stores one instance of that entity. To determine the presence of such an entity in a given generation, we check whether the debut gen of that entity is less than or eqal to the given generation.
  const genDependent = hasGenID(tableName);

  // Extract pagination fields.
  const paginationString = countMode 
    ? ``
    : getPaginationQueryString(pagination, tableName, true);
  const filterString = getFilterQueryString(filter, tableName);

  let whereString;
  // The query is asking for entities present in the given generation.
  if (presence) {
    // If entity is generation dependent, then we check 'generation_id'.
    if (genDependent) { whereString = `WHERE generation_id IN ?`; }
    // Otherwise, we check whether the entity was introduced in one of the given generations.
    else { whereString = `WHERE introduced IN ?`} 
  } 
  // The query is asking for entities introduced in the given generation.
  else {
    // If entity is generation dependent, we check whether the entity was introduced in one of the given generations, and then select those entities whose 'generation_id' matches 'introduced'.
    if (genDependent) { 
      whereString = `
        WHERE introduced IN ?
        AND introduced = generation_id
      `;
    }
    // Otherwise, we check whether the entity was introduced in one of the given generations.
    else { whereString = `WHERE introduced IN ?`}
  }

  return countMode 
    ? `
      SELECT ${genDependent ? `generation_id` : `introduced`},  COUNT(*) as row_count FROM ${tableName}
      ${whereString}
      ${filterString}
      ${paginationString}
      GROUP BY ${genDependent ? `generation_id` : `introduced`}
    ` : `
      SELECT * FROM ${tableName}
      ${whereString}
      ${filterString}
      ${paginationString}
    `;
}

module.exports = {
  computeGenerationTableQueryString,
};