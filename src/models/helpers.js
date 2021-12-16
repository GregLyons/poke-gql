// Returns where the given entity tableName has a 'generation_id' column.
const hasGenID = (tableName) => {
  return !['generation', 'pdescription', 'sprite', 'version_group'].includes(tableName);
}

// Given the name of an entity, returns the corresponding name of the table in the database.
const entityNameToTableName = entityName => {
  switch(entityName) {
    case 'fieldState':
      return 'field_state';
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

// Compute the junction table given information about the component entity tables.
/*
  Generally, junction tables are of the form '<firstTableName>_<secondTableName>', e.g. 'pokemon_ability' for the junction table between 'pokemon' and 'ability'.

  However, a pair of entity tables can have multiple junction tables between them, e.g. 'ability_boosts_ptype' and 'ability_resists_ptype'. In this case, 'middle' contains the necessary word.

  Moreover, a few junction tables don't have names of the above form, e.g. 'natural_gift', 'pokemon_evolution', etc. In this case, 'middle' is used to determine the special junction table name directly, rather than building up from the entity table names.
*/
const getJunctionTableName = (ownerTableName, ownedTableName, middle) => {
  // Special cases
  if (middle === 'natural_gift') {
    return 'natural_gift';
  }
  if (middle === 'weather_ball') {
    return 'weather_ball';
  }
  else if (middle === 'ptype_matchup') {
    return 'ptype_matchup';
  }
  else if (middle === 'evolution') {
    return 'pokemon_evolution';
  }
  else if (middle === 'form') {
    return 'pokemon_form';
  }
  
  // General case
  else {
    return middle 
      ? ownerTableName + '_' + middle + '_' + ownedTableName
      : ownerTableName + '_' + ownedTableName;
  }
}

const getForeignKeyColumnNames = (junctionTableName, ownerTableName, ownedTableName) => {
  let junctionOwnedID,
      junctionOwnedGen,
      junctionOwnerID,
      junctionOwnerGen;
  
  switch (junctionTableName) {
    // 'base_pmove_generation_id'
    case 'pmove_requires_pmove':
      // 'owned' is the move being required
      junctionOwnerID = 'requiring_pmove_id';
      junctionOwnerGen = 'requiring_pmove_generation_id';
      junctionOwnedID = 'required_pmove_id';
      junctionOwnedGen = 'required_pmove_generation_id';
      break;

    case 'natural_gift':
      // 'owned' is the type
      junctionOwnerID = 'item_id';
      junctionOwnerGen = 'item_generation_id';
      junctionOwnedID = 'ptype_id';
      junctionOwnedGen = 'ptype_generation_id';
      break;

    case 'weather_ball':
      // 'owned' is the type
      junctionOwnerID = 'field_state_id';
      junctionOwnerGen = 'field_state_generation_id';
      junctionOwnedID = 'ptype_id';
      junctionOwnedGen = 'ptype_generation_id';
      break;

    case 'ptype_matchup':
      // 'owned' is the offensive type
      junctionOwnerID = 'attacking_ptype_id';
      junctionOwnerGen = 'attacking_ptype_generation_id';
      junctionOwnedID = 'defending_ptype_id';
      junctionOwnedGen = 'defending_ptype_generation_id';
      break;

    case 'pokemon_evolution':
      // 'owned' is the evolution
      junctionOwnerID = 'prevolution_id';
      junctionOwnerGen = 'prevolution_generation_id';
      junctionOwnedID = 'evolution_id';
      junctionOwnedGen = 'evolution_generation_id';
      break;

    case 'pokemon_form':
      // 'owned' is the alternate form
      junctionOwnerID = 'base_form_id';
      junctionOwnerGen = 'base_form_generation_id';
      junctionOwnedID = 'form_id';
      junctionOwnedGen = 'form_generation_id';
      break;

    default:
      junctionOwnerID = ownerTableName + '_id';
      junctionOwnerGen = ownerTableName + '_generation_id';
      junctionOwnedID = ownedTableName + '_id';
      junctionOwnedGen = ownedTableName + '_generation_id';
  }

  // if (reverse) {
  //   [junctionOwnerGen, junctionOwnerID, junctionOwnedGen, junctionOwnedID] = [junctionOwnedGen, junctionOwnedID, junctionOwnerGen, junctionOwnerID];
  // }

  return {
    junctionOwnerGen,
    junctionOwnerID,
    junctionOwnedGen,
    junctionOwnedID,
  };
}

// Compute the query string given pagination and filter information, the names of the entities, and other data.
/*
  'ownerEntityName' and 'ownedEntityName' refer to the order of the entity table names in the relevant junction table name. For example, in 'pokemon_ability', the owning entity is the Pokemon, and the owned entity is the Ability. 

  'middle' is an additional string used to help find the correct junction table.

  'reverse' is a Boolean. If it is false, then the GraphQL edge direction matches the owner-owned relationship in the database. If instead 'reverse' is true, then the edge direction opposes the owner-owned relationship in the database. 
  
  For example, for an edge from a Pokemon Node to an Ability Node, the edge direction matches the ownership relationship, represented by 'pokemon_ability'. For an edge from an Ability Node to a Pokemon Node, then the ending Pokemon Node is the owner in the relationship, rather than the starting Ability Node.

  For another example, consider the 'enablesMove' and 'requiresMove' fields for a Move Node. The relevant junction table is 'pmove_requires_pmove', so the 'owned' is the base Move, and the 'owner' is the Move requiring the base Move. Thus, the edge direction for 'requiresMove' matches the owner-owned relationship, whereas the edge direction for 'enablesMove' opposes the owner-owned relationship.
*/
const computeJunctionTableQueryString = ([
  pagination,
  filter,
  ownerEntityName,
  ownedEntityName,
  middle,
  reverse
], countMode) => {
  // Compute the table names and id columns for the owning and owned tables, and then compute the starting and ending table names and id columns according to 'reverse'.
  //#region

  // Compute table and column names for the owner and owned entities.
  const ownerTableName = entityNameToTableName(ownerEntityName);
  const ownerID = ownerTableName + '_id';

  const ownedTableName = entityNameToTableName(ownedEntityName);
  const ownedID = ownedTableName + '_id';


  // Determine the start and ending entity types for the edge, based on 'reverse'.
  let startTableName, 
      startID,
      endTableName, 
      endID;
  // GraphQL edge direction opposes ownership relationship.
  if (reverse) {
    [
      startTableName,
      startID,
      endTableName,
      endID,
    ] = [
      ownedTableName,
      ownedID,
      ownerTableName,
      ownerID,
    ];
  } 
  // GraphQL edge direction matches ownership relationship.
  else {
    [
      startTableName,
      startID,
      endTableName,
      endID,
    ] = [
      ownerTableName,
      ownerID,
      ownedTableName,
      ownedID,
    ];
  }

  //#endregion


  // Compute the name of the junction table, as well as the names of its foreign key columns.
  //#region

  // Compute junction table name based on the owner and owned table names, as well as 'middle'.
  const junctionTableName = getJunctionTableName(ownerTableName, ownedTableName, middle);
  
  // Get foreign key column names from junction table.
  const {
    junctionOwnerGen,
    junctionOwnerID,
    junctionOwnedGen,
    junctionOwnedID,
  } = getForeignKeyColumnNames(junctionTableName, ownerTableName, ownedTableName);
  
  let junctionStartGen,
      junctionStartID,
      junctionEndGen,
      junctionEndID;
  // Edge direction opposes ownership relation.
  if (reverse) {
    [
      junctionStartGen,
      junctionStartID,
      junctionEndGen,
      junctionEndID,
    ] = [
      junctionOwnedGen,
      junctionOwnedID,
      junctionOwnerGen,
      junctionOwnerID,
    ];
  // Edge direction matches ownership relation.
  } else {
    [
      junctionStartGen,
      junctionStartID,
      junctionEndGen,
      junctionEndID,
    ] = [
      junctionOwnerGen,
      junctionOwnerID,
      junctionOwnedGen,
      junctionOwnedID,
    ];
  }

  //#endregion


  // Compute clauses for the query.
  /*
    For the code below, keep in mind that:

      onString: We want data on the ending Nodes.

      whereString: We want to select only those rows from the junction table which correspond to the starting Node.

      filterString: Any additional filtering is based on the ending Nodes.

      paginationString: Only the junction table itself is relevant for pagination (limit, offset, sorting, ordering).
  */
  //#region

  const onString = hasGenID(endTableName) 
    ? `ON (${junctionTableName}.${junctionEndGen}, ${junctionTableName}.${junctionEndID}) = (${endTableName}.generation_id, ${endTableName}.${endID})`
    : `ON ${junctionTableName}.${junctionEndID} = ${endTableName}.${endID}`;

  // '?' will be filled in with primary keys from the owner table when batching.
  const whereString = hasGenID(startTableName) 
    ? `WHERE (${junctionTableName}.${junctionStartGen}, ${junctionTableName}.${junctionStartID}) IN ?`
    : `WHERE (${junctionTableName}.${junctionStartID}) IN ?`

  const filterString = getFilterQueryString(filter, endTableName);

  const paginationString = getPaginationQueryString(pagination, junctionTableName);

  //#endregion


  // Finally, compute the query.
  const queryString = countMode 
    ? `
        SELECT ${junctionStartGen}, ${junctionStartID}, COUNT(*) AS row_count FROM ${junctionTableName} RIGHT JOIN ${endTableName} 
        ${onString}
        ${whereString}
        ${filterString}
        ${paginationString}
        GROUP BY ${junctionStartGen}, ${junctionStartID}
      `
    : `
        SELECT * FROM ${junctionTableName} RIGHT JOIN ${endTableName} 
        ${onString}
        ${whereString}
        ${filterString}
        ${paginationString}
      `;

  return {startTableName, junctionStartGen, junctionStartID, queryString}
}

// Return a MySQL string for paginating results.
// 'pagination' is an object with 'limit', 'offset', 'orderBy', 'sortBy', and 'search' keys.
const getPaginationQueryString = (pagination, tableName) => {
  if (!pagination) return ``;

  const {limit, offset, orderBy, sortBy, search} = pagination;

  const tablesWithFormattedName = [
    'ability',
    'effect',
    'field_state',
    'item',
    'pmove',
    'pokemon',
    'pstatus',
    'ptype',
    'stat',
    'usage_method',
    'version_group'
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
// 'filter' may have other keys depending on the type of entity being filtered.
const getFilterQueryString = (filter, tableName) => {
  if (!filter) return ``;

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

    // Form class
    const formClassString = filter.isBaseForm
      ? `AND pokemon_form_class = '${filter.isBaseForm.toLowerCase()}'`
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

      ${formClassString}
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
  // Items
  else if (tableName === 'item') {
    const itemClassString = filter.class
      ? `AND item_class = '${filter.class.toLowerCase()}'`
      : ``;

    extraFilterString = `
      ${itemClassString}
    `;
  }
  // FieldStates
  else if (tableName === 'item') {
    const fieldStateClassString = filter.class
      ? `AND field_state_class = '${filter.class.toLowerCase()}'`
      : ``;

    const fieldDamagePercentString = filter.damagePercent
      ? `AND field_state_damage_percent = '${filter.damagePercent.toLowerCase()}'`
      : ``;
      
    const fieldMaxLayersString = filter.maxLayers
      ? `AND field_state_max_layers = '${filter.maxLayers.toLowerCase()}'`
      : ``;

    const fieldStateGroundedString = filter.grounded
      ? `AND field_state_only_grounded = '${filter.grounded.toLowerCase()}'`
      : ``;

    const fieldStateTargetString = filter.target
      ? `AND field_state_target = '${filter.target.toLowerCase()}'`
      : ``;

    extraFilterString = `
      ${fieldStateClassString}
      ${fieldDamagePercentString}
      ${fieldMaxLayersString}
      ${fieldStateGroundedString}
      ${fieldStateTargetString}
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

module.exports = {
  computeJunctionTableQueryString,
  entityNameToTableName,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
}