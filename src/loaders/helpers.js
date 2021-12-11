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
  return !['generation', 'version_group', 'sprite', 'pdescription'].includes(tableName);
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
    if (middle === 'natural_gift') {
      junctionTableName = 'natural_gift';
    }
    else if (middle === 'ptype_matchup') {
      junctionTableName = 'ptype_matchup';
    }
    else if (middle === 'evolution') {
      junctionTableName = 'pokemon_evolution';
    }
    else if (middle === 'form') {
      junctionTableName = 'pokemon_form';
    }
    else if (reverse) {
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
        // 'owned' is the move being required, i.e. base move
        if(!reverse) {
          junctionOwnerID = 'requiring_pmove_id';
          junctionOwnerGen = 'requiring_pmove_generation_id';
          junctionOwnedID = 'required_pmove_id';
          junctionOwnedGen = 'required_pmove_generation_id';
        } 
        // 'owned' is the move doing the requiring 
        else {
          junctionOwnerID = 'required_pmove_id';
          junctionOwnerGen = 'required_pmove_generation_id';
          junctionOwnedID = 'requiring_pmove_id';
          junctionOwnedGen = 'requiring_pmove_generation_id';
        }
        break;
      case 'natural_gift':
        // 'owned' is the type
        if(!reverse) {
          junctionOwnerID = 'item_id';
          junctionOwnerGen = 'item_generation_id';
          junctionOwnedID = 'ptype_id';
          junctionOwnedGen = 'ptype_generation_id';
        }
        // 'owned' is the item
        else {
          junctionOwnerID = 'ptype_id';
          junctionOwnerGen = 'ptype_generation_id';
          junctionOwnedID = 'item_id';
          junctionOwnedGen = 'item_generation_id';
        }
        break;
      case 'ptype_matchup':
        // 'owned' is the offensive type
        if(!reverse) {
          junctionOwnerID = 'attacking_ptype_id';
          junctionOwnerGen = 'attacking_ptype_generation_id';
          junctionOwnedID = 'defending_ptype_id';
          junctionOwnedGen = 'defending_ptype_generation_id';
        }
        // 'owned' is the defensive type
        else {
          junctionOwnerID = 'defending_ptype_id';
          junctionOwnerGen = 'defending_ptype_generation_id';
          junctionOwnedID = 'attacking_ptype_id';
          junctionOwnedGen = 'attacking_ptype_generation_id';
        }
        break;
      case 'pokemon_evolution':
        // 'owned' is the evolution
        if(!reverse) {
          junctionOwnerID = 'prevolution_id';
          junctionOwnerGen = 'prevolution_generation_id';
          junctionOwnedID = 'evolution_id';
          junctionOwnedGen = 'evolution_generation_id';
        }
        // 'owned' is the prevolution
        else {
          junctionOwnerID = 'evolution_id';
          junctionOwnerGen = 'evolution_generation_id';
          junctionOwnedID = 'prevolution_id';
          junctionOwnedGen = 'prevolution_generation_id';
        }
        break;
      case 'pokemon_form':
        // 'owned' is the alternate form
        if(!reverse) {
          junctionOwnerID = 'base_form_id';
          junctionOwnerGen = 'base_form_generation_id';
          junctionOwnedID = 'form_id';
          junctionOwnedGen = 'form_generation_id';
        }
        // 'owned' is the base form
        else {
          junctionOwnerID = 'form_id';
          junctionOwnerGen = 'form_generation_id';
          junctionOwnedID = 'base_form_id';
          junctionOwnedGen = 'base_form_generation_id';
        }
        break;
      default:
        junctionOwnerID = owner + '_id';
        junctionOwnerGen = owner + '_generation_id';
        junctionOwnedID = owned + '_id';
        junctionOwnedGen = owned + '_generation_id';
    }

    // Compute other clauses
    const onString = isGenDependent(owned) 
      ? `ON (${junctionTableName}.${junctionOwnedGen}, ${junctionTableName}.${junctionOwnedID}) = (${owned}.generation_id, ${owned}.${ownedID})`
      : `ON ${junctionTableName}.${junctionOwnedID} = ${owned}.${ownedID}`;

    // If the two entity tables are the same, then ambiguity will arise without the junction table name.
    const whereString = isGenDependent(owner) 
      ? `WHERE (${junctionTableName}.${junctionOwnerGen}, ${junctionTableName}.${junctionOwnerID}) IN ?`
      : `WHERE (${junctionTableName}.${junctionOwnerID}) IN ?`

    const paginationString = getPaginationQueryString(pagination, junctionTableName);

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
      // console.log(`
      // SELECT * FROM ${junctionTableName} RIGHT JOIN ${owned} 
      // ${onString}
      // ${whereString}
      // ${paginationString}
      // `)
      // console.log(entityPKs.map(d => {
      //   return isGenDependent(owner) 
      //     ? [d.genID, d.entityID]
      //     : [d.entityID];
      // }))
      // console.log(results);
      return results;
    })
    .catch(console.log);

    return entityPKs.map(entityPK => data.filter(d => 
      d[junctionOwnerGen] === entityPK.genID 
      && d[junctionOwnerID] === entityPK.entityID));
  }
}

module.exports = {
  getPaginationQueryString,

  batchGens,
  basicJunctionBatcher,
}