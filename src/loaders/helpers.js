const {db} = require('../models/index.js');

// 'pagination' is an object with 'limit', 'offset', 'orderBy', 'sortBy', and 'search' keys.
const getPaginationQueryString = (pagination, tableName) => {
  const {limit, offset, orderBy, sortBy, search} = pagination;

  const tablesWithFormattedName = [
    'ability', 'effect', 'item', 'pmove', 'pokemon', 'stat', 'pstatus', 'ptype', 'usage_method', 'version_group'
  ]

  const limitOffsetString = `LIMIT ${offset}, ${limit}`;
  // Most columns, except 'generation_id' and 'introduced' are preceded by the table name.
  let sortString;

  // 'introduced' and 'generation_id' aren't preceded by the table name 
  if (orderBy === 'introduced' || orderBy === 'generation_id') {
      sortString = `ORDER BY ${orderBy} ${sortBy}`
  } 
  // default argument for 'orderBy' is 'formatted_name'. For most fields, the appropriate column--which is what 'orderBy' represents--is preceded by the name of the table, followed by an underscore '_'.
  else if (orderBy != 'formatted_name' || tablesWithFormattedName.includes(tableName)) {
    sortString = `ORDER BY ${tableName}_${orderBy} ${sortBy}`;
  }
  else {
    sortString = '';
  }

  const searchString = search && tablesWithFormattedName.includes(tableName)
    ? `AND ${tableName}_formatted_name LIKE %${search}%`
    : '';

  return `
    ${searchString}
    ${sortString}
    ${limitOffsetString}
  `
}

const batchGens = (pagination) => {
  return async gens => {
    const paginationString = getPaginationQueryString(pagination, 'generation');

    const genData = await db.promise().query(
      `
        SELECT * FROM generation
        WHERE generation_id IN ?
        ${paginationString}
      `, [[gens]]
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);

    return gens.map(gen => genData.filter(genDatum => genDatum.generation_id === gen));
  }
}

const effectBatcher = (pagination, tableName) => {
  return async entityPKs => { 
    const paginationString = getPaginationQueryString(pagination, `${tableName}_effect`);

    const effectJunctionData = await db.promise().query(
      `
        SELECT * FROM ${tableName}_effect RIGHT JOIN effect
        ON ${tableName}_effect.effect_id = effect.effect_id
        WHERE (${tableName}_generation_id, ${tableName}_id) IN ?
        ${paginationString}
      `, [[entityPKs.map(d => [d.genID, d.entityID])]]
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);

    const entityGenIDColumn = `${tableName}_generation_id`;
    const entityIDColumn = `${tableName}_id`;

    return entityPKs.map(entityPK => effectJunctionData.filter(d => 
      d[entityGenIDColumn] === entityPK.genID 
      && d[entityIDColumn] === entityPK.entityID));
  }
}

module.exports = {
  getPaginationQueryString,

  batchGens,
  effectBatcher,
}