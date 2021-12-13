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

// Return a MySQL string for paginating results.
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

// Return a MySQL string for filtering results.
// 'filter' is an object with 'introduced', 'introducedAfter', 'introducedBefore', 'name', 'contains', 'endsWith', 'startsWith' keys.
const getFilterQueryString = (filter, tableName) => {
  // Introduction filtering
  //#region

  const introducedString = filter.introduced
    ? `AND introduced = ${filter.introduced}`
    : ``;

  const introducedAfterString = filter.introducedAfter
    ? `AND introduced >= ${filter.introducedAfter}`
    : ``;

  const introducedBeforeString = filter.introducedBefore
    ? `AND introduced <= ${filter.introducedBefore}`
    : ``;

  const debutFilterString = `
    ${introducedString}
    ${introducedAfterString}
    ${introducedBeforeString}
  `;

  //#endregion

  // Name filtering
  //#region

  let nameColumn;
  switch(tableName) {
    case 'generation':
      nameColumn = 'code';
      break;
    case 'sprite':
    case 'pdescription':
      nameColumn = 'entity_name';
      break;
    default:
      nameColumn = 'name';
  }

  const nameString = filter.name 
    ? `AND ${tableName}_${nameColumn} = '${filter.name}'`
    : ``;

  const containsString = filter.contains 
    ? `AND ${tableName}_${nameColumn} LIKE '%${filter.contains}%'`
    : ``;

  const startsWithString = filter.startsWith 
    ? `AND ${tableName}_${nameColumn} LIKE '${filter.startsWith}%'`
    : ``;

  const  endsWithString = filter.endsWith
    ? `AND ${tableName}_${nameColumn} LIKE '%${filter.endsWith}'`
    : ``;
  
  //#endregion

  // Extra filtering, with options dependent on the type of entity.
  //#region

  let extraFilterString;

  // Pokemon
  if (tableName === 'pokemon') {
    // Dex
    const maxWeightString = filter.maxWeight
      ? `AND pokemon_weight <= ${filter.maxWeight}`
      : ``;
    const minWeightString = filter.minWeight
      ? `AND pokemon_weight >= ${filter.minWeight}`
      : ``;

    // Dex
    const maxHeightString = filter.maxHeight
      ? `AND pokemon_height <= ${filter.maxHeight}`
      : ``;
    const minHeightString = filter.minHeight
      ? `AND pokemon_height >= ${filter.minHeight}`
      : ``;

    // Dex
    const maxDexString = filter.maxDex
      ? `AND pokemon_dex <= ${filter.maxDex}`
      : ``;
    const minDexString = filter.minDex
      ? `AND pokemon_dex >= ${filter.minDex}`
      : ``;

    // HP
    const maxHPString = filter.maxHP
      ? `AND pokemon_hp <= ${filter.maxHP}`
      : ``;
    const minHPString = filter.minHP
      ? `AND pokemon_hp >= ${filter.minHP}`
      : ``;
    
    // Attack
    const maxAttackString = filter.maxAttack
      ? `AND pokemon_attack <= ${filter.maxAttack}`
      : ``;
    const minAttackString = filter.minAttack
      ? `AND pokemon_attack >= ${filter.minAttack}`
      : ``;

    // Defense
    const maxDefenseString = filter.maxDefense
      ? `AND pokemon_defense <= ${filter.maxDefense}`
      : ``;
    const minDefenseString = filter.minDefense
      ? `AND pokemon_defense >= ${filter.minDefense}`
      : ``;

    // Special Attack
    const maxSpecialAttackString = filter.maxSpecialAttack
      ? `AND pokemon_special_attack <= ${filter.maxSpecialAttack}`
      : ``;
    const minSpecialAttackString = filter.minSpecialAttack
      ? `AND pokemon_special_attack >= ${filter.minSpecialAttack}`
      : ``;

    // Special Defense
    const maxSpecialDefenseString = filter.maxSpecialDefense
      ? `AND pokemon_special_defense <= ${filter.maxSpecialDefense}`
      : ``;
    const minSpecialDefenseString = filter.minSpecialDefense
      ? `AND pokemon_special_defense >= ${filter.minSpecialDefense}`
      : ``;

    // Speed
    const maxSpeedString = filter.maxSpeed
      ? `AND pokemon_speed <= ${filter.maxSpeed}`
      : ``;
    const minSpeedString = filter.minSpeed
      ? `AND pokemon_speed >= ${filter.minSpeed}`
      : ``;

    // Base form
    const baseFormString = filter.isBaseForm
    ? `AND pokemon_is_base_form = '${filter.isBaseForm}'`
    : ``;

    extraFilterString = `
      ${maxWeightString}
      ${minWeightString}

      ${maxHeightString}
      ${minHeightString}

      ${maxDexString}
      ${minDexString}

      ${maxHPString}
      ${minHPString}

      ${maxAttackString}
      ${minAttackString}

      ${maxDefenseString}
      ${minDefenseString}

      ${maxSpecialAttackString}
      ${minSpecialAttackString}

      ${maxSpecialDefenseString}
      ${minSpecialDefenseString}

      ${maxSpeedString}
      ${minSpeedString}

      ${baseFormString}
    `
  }
  // Moves
  else if (tableName === 'pmove') {
    // Power
    const maxPowerString = filter.maxPower
      ? `AND pmove_power <= ${filter.maxPower}`
      : ``;
    const minPowerString = filter.minPower
      ? `AND pmove_power >= ${filter.minPower}`
      : ``;

    // PP
    const maxPPString = filter.maxPP
      ? `AND pmove_power <= ${filter.maxPP}`
      : ``;
    const minPPString = filter.minPower
      ? `AND pmove_pp >= ${filter.minPP}`
      : ``;
    
    // Accuracy
    const maxAccuracyString = filter.maxAccuracy
      ? `AND pmove_accuracy <= ${filter.maxAccuracy}`
      : ``;
    const minAccuracyString = filter.minAccuracy
      ? `AND pmove_accuracy >= ${filter.minAccuracy}`
      : ``;
    const bypassAccuracyString = filter.bypassAccuracy 
      ? `AND pmove_accuracy = NULL`
      : ``;

    // Priority
    const maxPriorityString = filter.maxPriority
      ? `AND pmove_priority <= ${filter.maxPriority}`
      : ``;
    const minPriorityString = filter.minPriority
      ? `AND pmove_priority >= ${filter.minPriority}`
      : ``;

    // Category
    const categoryString = filter.category
      ? `AND pmove_category = '${filter.category.toLowerCase()}'`
      : ``;

    // Target
    const targetString = filter.target
      ? `AND pmove_target = '${filter.target.toLowerCase()}'`
      : ``;
      
    // Contact
    const contactString = filter.contact
      ? `AND pmove_contact = '${filter.contact.toLowerCase()}'`
      : ``;
      
    extraFilterString = `
      ${maxPowerString}
      ${minPowerString}

      ${maxPPString}
      ${minPPString}

      ${maxAccuracyString}
      ${minAccuracyString}
      ${bypassAccuracyString}

      ${maxPriorityString}
      ${minPriorityString}
      
      ${categoryString}
      ${targetString}
      ${contactString}
    `;  
  }
  // Default case
  else {
    extraFilterString = ``;
  }

  //#endregion

  const nameFilterString = `
    ${nameString}
    ${containsString}
    ${startsWithString}
    ${endsWithString}
  `;
  
  return `
    ${debutFilterString}
    ${nameFilterString}
    ${extraFilterString}
  `;
}

const batchGens = (pagination) => {
  return async gens => {
    const paginationString = getPaginationQueryString(pagination, 'generation');
    const filterString = getFilterQueryString(filter, 'generation');

    const genData = await db.promise().query(
      `
        SELECT * FROM generation
        WHERE generation_id IN ?
        ${filterString}
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

const basicJunctionBatcher = (pagination, filter, ownerEntityName, ownedEntityName, middle = '', reverse = false) => {
  return async entityPKs => {
    if (reverse) {
      [ownerEntityName, ownedEntityName] = [ownedEntityName, ownerEntityName]
    }

    // Compute table and column names
    const ownerTableName = entityNameToTableName(ownerEntityName);
    const ownerGen = ownerTableName + '_generation_id';
    const ownerID = ownerTableName + '_id';

    const ownedTableName = entityNameToTableName(ownedEntityName);
    const ownedID = ownedTableName + '_id';
    const ownedGen = ownedTableName + '_generation_id';

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
        ? ownedTableName + '_' + middle + '_' + ownerTableName
        : ownedTableName + '_' + ownerTableName;
    } 
    else {
      junctionTableName = middle 
        ? ownerTableName + '_' + middle + '_' + ownedTableName
        : ownerTableName + '_' + ownedTableName;
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
        junctionOwnerID = ownerTableName + '_id';
        junctionOwnerGen = ownerTableName + '_generation_id';
        junctionOwnedID = ownedTableName + '_id';
        junctionOwnedGen = ownedTableName + '_generation_id';
    }

    // Compute other clauses
    const onString = isGenDependent(ownedTableName) 
      ? `ON (${junctionTableName}.${junctionOwnedGen}, ${junctionTableName}.${junctionOwnedID}) = (${ownedTableName}.generation_id, ${ownedTableName}.${ownedID})`
      : `ON ${junctionTableName}.${junctionOwnedID} = ${ownedTableName}.${ownedID}`;

    // If the two entity tables are the same, then ambiguity will arise without the junction table name.
    const whereString = isGenDependent(ownerTableName) 
      ? `WHERE (${junctionTableName}.${junctionOwnerGen}, ${junctionTableName}.${junctionOwnerID}) IN ?`
      : `WHERE (${junctionTableName}.${junctionOwnerID}) IN ?`

    const paginationString = getPaginationQueryString(pagination, junctionTableName);
    const filterString = getFilterQueryString(filter, ownedTableName);

    const data = await db.promise().query(
      `
        SELECT * FROM ${junctionTableName} RIGHT JOIN ${ownedTableName} 
        ${onString}
        ${whereString}
        ${filterString}
        ${paginationString}
      `,
      [[entityPKs.map(d => {
        return isGenDependent(ownerTableName) 
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
  getFilterQueryString,

  batchGens,
  basicJunctionBatcher,
}