const {db} = require('../models/index.js');

const entityNameToTableName = entityName => {
  switch(entityName) {
    case 'usageMethod':
      return 'usage_method';
    case 'versionGroup':
      return 'version_group';
    case 'type':
      return 'ptype';
    case 'move':
      return 'pmove';
    case 'status':
      return 'pstatus';
    case 'description':
      return 'pdescription';
    case 'generation':
    case 'sprite':
    case 'ability':
    case 'item':
    case 'effect':
    case 'pokemon':
    case 'stat':
      return entityName;
    default:
      throw `Invalid entity name: ${entityName}.`;
  }
}

const isGenDependent = tableName => {
  return !['effect', 'generation', 'pstatus', 'stat', 'usage_method', 'version_group'].includes(tableName);
}

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

const basicJunctionBatcher = (pagination, ownerEntityName, ownedEntityName) => {
  return async entityPKs => {
    const owner = entityNameToTableName(ownerEntityName);
    const ownerGen = owner + '_generation_id';
    const ownerID = owner + '_id';

    const owned = entityNameToTableName(ownedEntityName);
    const ownedID = owned + '_id';
    const ownedGen = owned + '_generation_id';

    const junctionTableName = owner + '_' + owned;

    const paginationString = getPaginationQueryString(pagination, `${owner}_${owned}`);

    const onString = isGenDependent(owned) 
      ? `ON (${junctionTableName}.${ownedGen}, ${junctionTableName}.${ownedID}) = (${owned}.generation_id, ${owned}.${ownedID})`
      : `ON ${junctionTableName}.${ownedID} = ${owned}.${ownedID}`;

    const whereString = `WHERE (${ownerGen}, ${ownerID}) IN ?`

    const junctionData = await db.promise().query(
      `
        SELECT * FROM ${owner}_${owned} RIGHT JOIN ${owned} 
        ${onString}
        ${whereString}
        ${paginationString}
      `,
      [[entityPKs.map(d => [d.genID, d.entityID])]]
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);

    return entityPKs.map(entityPK => junctionData.filter(d => 
      d[ownerGen] === entityPK.genID 
      && d[ownerID] === entityPK.entityID));
  }
}

module.exports = {
  getPaginationQueryString,

  batchGens,
  basicJunctionBatcher,
}