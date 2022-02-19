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
    case 'nature':
    case 'pokemon':
    case 'stat':
      return entityName;
    default:
      throw `Invalid entity name: ${entityName}.`;
  }
}

// Goes through the keys of an object and removes non-alphanumeric/underscore characters from String values.
const escapeObjectParameters = obj => {
  // If null, return.
  if (!obj) return obj;

  // Iterate over object keys.
  for (let key of Object.keys(obj)) {
    // For keys whose values are strings, escape dangerous characters.
    if (typeof obj[key] === 'string' || obj[key] instanceof String) {
      obj[key] = obj[key].replace(/[\W]+/gi, '');
    }
  }
  return obj
}

const arrayToMySQL = arr => {
  return "(" + arr.map(name => ("'" + name + "'").toLowerCase()).join(', ') + ")";
}

// Column name maps 
// #region

const abilityColumnNameMap = new Map([
  ['POKEMON_SHOWDOWN_ID', 'ps_id'],
]);

const itemColumnNameMap = new Map([
  ['POKEMON_SHOWDOWN_ID', 'ps_id'],
])

const moveColumnNameMap = new Map([
  ['POKEMON_SHOWDOWN_ID', 'ps_id'],
  ['TYPE_NAME', 'ptype_name'],
]);

const pokemonColumnNameMap = new Map([
  ['POKEMON_SHOWDOWN_ID', 'ps_id'],
  ['SPECIES_NAME', 'species'],
  ['TYPE_NAME_1', 'ptype_name_1'],
  ['TYPE_NAME_2', 'ptype_name_2'],
]);

const tableNameToMap = new Map([
  ['ability', abilityColumnNameMap],
  ['item', itemColumnNameMap],
  ['pmove', moveColumnNameMap],
  ['pokemon', pokemonColumnNameMap],
]);

// #endregion

//
getDatabaseColumnName = (tableName, columnName) => {
  if (columnName === 'GEN') columnName = 'GENERATION_ID';
  if (columnName === undefined) return undefined;

  // If not in maps, then just change columnName to lowercase
  return `${tableName}_` + (
    (tableNameToMap.get(tableName) && tableNameToMap.get(tableName).get(columnName)) 
    || columnName.toLowerCase());
}

// Return a MySQL string for paginating results.
// 'pagination' is an object with 'limit', 'offset', 'orderBy', 'sortBy', and 'search' keys.
// String parameters are escaped to prevent SQL injection.
const getPaginationQueryString = (pagination, tableName, batching = false) => {
  if (!pagination) return ``;
  
  // Escape pagination parameters.
  escapeObjectParameters(pagination);

  const {limit, offset, orderBy, sortBy, search} = pagination;
  const orderByColumnName = getDatabaseColumnName(tableName, orderBy);

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

  // If this is called by a batcher, we don't want to apply the limit/offset to the query. Instead, we handle that in the batcher.
  const limitOffsetString = batching
    ? ``
    : `LIMIT ${offset}, ${limit}\n`;

  // Most columns, except 'generation_id' and 'introduced' are preceded by the table name.
  let sortString = orderByColumnName !== undefined && sortBy !== undefined
    ? `ORDER BY ${orderByColumnName} ${sortBy}`
    : ``;

  const searchString = search && tablesWithFormattedName.includes(tableName)
    ? `AND ${tableName}_formatted_name LIKE %${search}%`
    : '';

  return '\n' + [searchString, sortString, limitOffsetString].filter(d => d.length > 0).join('\n')
}

// Return a MySQL string for filtering results.
// 'filter' is an object with 'introduced', 'introducedAfter', 'introducedBefore', 'name', 'contains', 'endsWith', 'startsWith' keys. 
// 'filter' may have other keys depending on the type of entity being filtered.
// String parameters are escaped to prevent SQL injection.
const getFilterQueryString = (filter, tableName) => {
  
  if (!filter) return ``;

  if (!hasGenID(tableName)) {
    return ``;
  }

  // Escape filter parameters.
  escapeObjectParameters(filter);

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

  const debutFilterString = '\n' + [introducedString, introducedAfterString, introducedBeforeString].filter(d => d.length > 0).join('\n')

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
    case 'effect':
    case 'field_state':
    case 'stat':
    case 'pstatus':
    case 'usage_method':
      nameColumn = 'unformatted_name';
      break;
    default:
      nameColumn = 'ps_id';
  }

  /* If 'names' is not specified, then:
      if 'name' is specified, set 'names' to [<name>]
      else, set 'names' to [].
  */
  if (!filter.names) filter.names = filter.name ? [filter.name] : [];

  const nameString = filter.names.length > 0
    ? `AND ${tableName}_${nameColumn} IN ${arrayToMySQL(filter.names)}`
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

    // BaseStatTotal
    const maxBaseStatTotalString = filter.maxBaseStatTotal
      ? `AND pokemon_base_stat_total <= ${filter.maxBaseStatTotal}`
      : ``;
    const minBaseStatTotalString = filter.minBaseStatTotal
      ? `AND pokemon_base_stat_total >= ${filter.minBaseStatTotal}`
      : ``;

    // Form class
    const formClassString = filter.formClass
      ? `AND pokemon_form_class IN ${arrayToMySQL(filter.formClass)}`
      : ``;

    // Typing
    const typeString = filter.types
      ? `AND (pokemon_ptype_name_1 IN ${arrayToMySQL(filter.types)} OR pokemon_ptype_name_2 IN ${arrayToMySQL(filter.types)})`
      : ``;

    // Removed from SwSh
    const removedFromSwShString = filter.removedFromSwSh === null || filter.removedFromSwSh === undefined
      ? ``
      : `AND pokemon_removed_from_swsh = ${filter.removedFromSwSh ? 'TRUE' : 'FALSE'}`;

    // Removed from BDSP
    const removedFromBDSPString = filter.removedFromBDSP === null || filter.removedFromBDSP === undefined
      ? ``
      : `AND pokemon_removed_from_bdsp = ${filter.removedFromBDSP ? 'TRUE' : 'FALSE'}`;

    extraFilterString = [
      maxWeightString,
      minWeightString,

      maxHeightString,
      minHeightString,

      maxDexString,
      minDexString,

      maxWeightString,
      minWeightString,

      maxHeightString,
      minHeightString,

      maxDexString,
      minDexString,

      maxHPString,
      minHPString,

      maxAttackString,
      minAttackString,

      maxDefenseString,
      minDefenseString,

      maxSpecialAttackString,
      minSpecialAttackString,

      maxSpecialDefenseString,
      minSpecialDefenseString,

      maxSpeedString,
      minSpeedString,

      maxBaseStatTotalString,
      minBaseStatTotalString,

      formClassString,
      typeString,

      removedFromSwShString,
      removedFromBDSPString,
    ].filter(d => d.length > 0).join('\n');
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
    const variablePowerString = filter.variablePower 
      ? `AND pmove_power = NULL`
      : ``;

    // PP
    const maxPPString = filter.maxPP
      ? `AND pmove_pp <= ${filter.maxPP}`
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
      ? `AND pmove_category IN ${arrayToMySQL(filter.category)}`
      : ``;

    // Target
    const targetString = filter.target
      ? `AND pmove_target IN ${arrayToMySQL(filter.target)}`
      : ``;
      
    // Contact
    const contactString = filter.contact !== undefined
      ? `AND pmove_contact = ${filter.contact ? 'TRUE' : 'FALSE'}`
      : ``;

    // Types
    const typeString = filter.types
    ? `AND pmove_ptype_name IN ${arrayToMySQL(filter.types)}`
    : ``;

    // Removed from SwSh
    const removedFromSwShString = filter.removedFromSwSh === null || filter.removedFromSwSh === undefined
      ? ``
      : `AND pmove_removed_from_swsh = ${filter.removedFromSwSh ? 'TRUE' : 'FALSE'}`;

    // Removed from BDSP
    const removedFromBDSPString = filter.removedFromBDSP === null || filter.removedFromBDSP === undefined
      ? ``
      : `AND pmove_removed_from_bdsp = ${filter.removedFromBDSP ? 'TRUE' : 'FALSE'}`;
      
    extraFilterString = [
      maxPowerString,
      minPowerString,
      variablePowerString,

      maxPPString,
      minPPString,

      maxAccuracyString,
      minAccuracyString,
      bypassAccuracyString,

      maxPriorityString,
      minPriorityString,
      
      categoryString,
      targetString,
      contactString,
      typeString,
      
      removedFromSwShString,
      removedFromBDSPString,
    ].filter(d => d.length > 0).join('\n');  
  }
  // Items
  else if (tableName === 'item') {
    const itemClassString = filter.class !== undefined && filter.class.length > 0
      ? `AND item_class IN ${arrayToMySQL(filter.class)}`
      : ``;

    extraFilterString = [
      itemClassString,
    ].filter(d => d.length > 0).join('\n');
  }
  // FieldStates
  else if (tableName === 'field_state') {
    const fieldStateClassString = filter.class !== undefined && filter.class.length > 0
      ? `AND field_state_class IN ${arrayToMySQL(filter.class)}`
      : ``;

    // Damage percent
    const maxDamagePercentString = filter.maxDamagePercent
      ? `AND field_state_damage_percent <= ${filter.maxDamagePercent}`
      : ``;
    const minDamagePercentString = filter.minDamagePercent
      ? `AND field_state_damage_percent >= ${filter.minDamagePercent}`
      : ``;
      
    const fieldMaxLayersString = filter.maxLayers
      ? `AND field_state_max_layers <= ${filter.maxLayers}`
      : ``;

    const fieldStateGroundedString = filter.grounded !== undefined
      ? `AND field_state_only_grounded = ${filter.grounded ? 'TRUE' : 'FALSE'}`
      : ``;

    const fieldStateTargetString = filter.target !== undefined && filter.target.length > 0
      ? `AND field_state_target IN ${arrayToMySQL(filter.target)}`
      : ``;

    extraFilterString = [
      fieldStateClassString,

      maxDamagePercentString,
      minDamagePercentString,

      fieldMaxLayersString,
      fieldStateGroundedString,
      fieldStateTargetString,
    ].filter(d => d.length > 0).join('\n');
  }
  // Items
  else if (tableName === 'pstatus') {
    const volatileString = filter.volatile !== undefined
      ? `AND pstatus_volatile = ${filter.volatile === true ? 'TRUE' : 'FALSE'}`
      : ``;

    extraFilterString = [
      volatileString,
    ].filter(d => d.length > 0).join('\n');

    console.log(volatileString);
  }
  // Default case
  else {
    extraFilterString = ``;
  }

  //#endregion

  const nameFilterString = [
    nameString,
    containsString,
    startsWithString,
    endsWithString,
  ].filter(d => d.length > 0).join('\n');
  
  return [
    debutFilterString,
    nameFilterString,
    extraFilterString,
  ].filter(d => d.length > 0).join('\n');
}

module.exports = {
  entityNameToTableName,
  escapeObjectParameters,

  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
}