// Returns where the given entity tableName has a 'generation_id' column.
const hasGenID = (tableName) => {
  return !['generation', 'pdescription', 'sprite', 'version_group'].includes(tableName);
}

// Given the name of an entity, returns the corresponding name of the table in the database.
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


// Return a MySQL string for paginating results.
// 'pagination' is an object with 'limit', 'offset', 'orderBy', 'sortBy', and 'search' keys.
const getPaginationQueryString = (pagination, tableName) => {
  if (!pagination) return ``;

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
  entityNameToTableName,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
}