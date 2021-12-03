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

const basicJunctionBatcher = (pagination, ownerEntityName, ownedEntityName, middle = '', reverse = false) => {
  return async entityPKs => {
    if (reverse) {
      [ownerEntityName, ownedEntityName] = [ownedEntityName, ownerEntityName]
    }

    // Compute table and column names
    const owner = entityNameToTableName(ownerEntityName);
    const ownerGen = owner + '_generation_id';
    const ownerID = owner + '_id';

    const owned = entityNameToTableName(ownedEntityName);
    const ownedID = owned + '_id';
    const ownedGen = owned + '_generation_id';

    let junctionTableName;
    if (reverse) {
      junctionTableName = middle 
        ? owned + '_' + middle + '_' + owner
        : owned + '_' + owner;
    } 
    else {
      junctionTableName = middle 
        ? owner + '_' + middle + '_' + owned
        : owner + '_' + owned;
    }

    // May need to change column names
    let junctionOwnedID, junctionOwnedGen;
    switch (junctionTableName) {
      // 'base_pmove_generation_id'
      case 'pmove_requires_pmove':
        junctionOwnedID = 'base_' + ownedID;
        junctionOwnedGen = 'base_' + ownedGen;
        break;
      default:
        junctionOwnedID = ownedID;
        junctionOwnedGen = ownedGen;
    }

    // Compute other clauses
    const onString = isGenDependent(owned) 
      ? `ON (${junctionTableName}.${junctionOwnedGen}, ${junctionTableName}.${junctionOwnedID}) = (${owned}.generation_id, ${owned}.${ownedID})`
      : `ON ${junctionTableName}.${junctionOwnedID} = ${owned}.${ownedID}`;

    // If the two entity tables are the same, then ambiguity will arise without the junction table name.
    const whereString = isGenDependent(owner) 
      ? `WHERE (${junctionTableName}.${ownerGen}, ${junctionTableName}.${ownerID}) IN ?`
      : `WHERE (${junctionTableName}.${ownerID}) IN ?`

    const paginationString = getPaginationQueryString(pagination, `${owner}_${owned}`);

    const data = await db.promise().query(
      `
        SELECT * FROM ${junctionTableName} RIGHT JOIN ${owned} 
        ${onString}
        ${whereString}
        ${paginationString}
      `,
      [[entityPKs.map(d => {
        return isGenDependent(owner) 
          ? [d.genID, d.entityID]
          : [d.entityID];
      })]]
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);

    return entityPKs.map(entityPK => data.filter(d => 
      d[ownerGen] === entityPK.genID 
      && d[ownerID] === entityPK.entityID));
  }
}

module.exports = {
  getPaginationQueryString,

  batchGens,
  basicJunctionBatcher,
}