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
    : `LIMIT ${Math.max(offset, 0)}, ${limit}\n`;

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
    case 'ptype':
    case 'nature':
      nameColumn = 'name';
      break;
    default:
      nameColumn = 'ps_id';
  }

  // If psID/psIDs is specified, set name/names to that
  if (filter.psID && !filter.name) filter.name = filter.psID;
  if (filter.psIDs && !filter.names) filter.names = filter.psIDs;

  /* 
    If 'names' is not specified, then:
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
    // Weight
    const maxWeightString = filter.maxWeight !== undefined
      ? `AND pokemon_weight <= ${filter.maxWeight}`
      : ``;
    const minWeightString = filter.minWeight !== undefined
      ? `AND pokemon_weight >= ${filter.minWeight}`
      : ``;

    // Height
    const maxHeightString = filter.maxHeight !== undefined
      ? `AND pokemon_height <= ${filter.maxHeight}`
      : ``;
    const minHeightString = filter.minHeight !== undefined
      ? `AND pokemon_height >= ${filter.minHeight}`
      : ``;

    // maleRate
    const maxMaleRateString = filter.maxMaleRate !== undefined
      ? `AND pokemon_male_rate <= ${filter.maxMaleRate}`
      : ``;
    const minMaleRateString = filter.minMaleRate !== undefined
      ? `AND pokemon_male_rate >= ${filter.minMaleRate}`
      : ``;

    // maleRate
    const maxFemaleRateString = filter.maxFemaleRate !== undefined
      ? `AND pokemon_female_rate <= ${filter.maxFemaleRate}`
      : ``;
    const minFemaleRateString = filter.minFemaleRate !== undefined
      ? `AND pokemon_female_rate >= ${filter.minFemaleRate}`
      : ``;

    // Dex
    const maxDexString = filter.maxDex !== undefined
      ? `AND pokemon_dex <= ${filter.maxDex}`
      : ``;
    const minDexString = filter.minDex !== undefined
      ? `AND pokemon_dex >= ${filter.minDex}`
      : ``;

    // HP
    const maxHPString = filter.maxHP !== undefined
      ? `AND pokemon_hp <= ${filter.maxHP}`
      : ``;
    const minHPString = filter.minHP !== undefined
      ? `AND pokemon_hp >= ${filter.minHP}`
      : ``;
    
    // Attack
    const maxAttackString = filter.maxAttack !== undefined
      ? `AND pokemon_attack <= ${filter.maxAttack}`
      : ``;
    const minAttackString = filter.minAttack !== undefined
      ? `AND pokemon_attack >= ${filter.minAttack}`
      : ``;

    // Defense
    const maxDefenseString = filter.maxDefense !== undefined
      ? `AND pokemon_defense <= ${filter.maxDefense}`
      : ``;
    const minDefenseString = filter.minDefense !== undefined
      ? `AND pokemon_defense >= ${filter.minDefense}`
      : ``;

    // Special Attack
    const maxSpecialAttackString = filter.maxSpecialAttack !== undefined
      ? `AND pokemon_special_attack <= ${filter.maxSpecialAttack}`
      : ``;
    const minSpecialAttackString = filter.minSpecialAttack !== undefined
      ? `AND pokemon_special_attack >= ${filter.minSpecialAttack}`
      : ``;

    // Special Defense
    const maxSpecialDefenseString = filter.maxSpecialDefense !== undefined
      ? `AND pokemon_special_defense <= ${filter.maxSpecialDefense}`
      : ``;
    const minSpecialDefenseString = filter.minSpecialDefense !== undefined
      ? `AND pokemon_special_defense >= ${filter.minSpecialDefense}`
      : ``;

    // Speed
    const maxSpeedString = filter.maxSpeed !== undefined
      ? `AND pokemon_speed <= ${filter.maxSpeed}`
      : ``;
    const minSpeedString = filter.minSpeed !== undefined
      ? `AND pokemon_speed >= ${filter.minSpeed}`
      : ``;

    // BaseStatTotal
    const maxBaseStatTotalString = filter.maxBaseStatTotal !== undefined
      ? `AND pokemon_base_stat_total <= ${filter.maxBaseStatTotal}`
      : ``;
    const minBaseStatTotalString = filter.minBaseStatTotal !== undefined
      ? `AND pokemon_base_stat_total >= ${filter.minBaseStatTotal}`
      : ``;

    // Form class
    const formClassString = filter.formClass !== undefined && filter.formClass.length > 0
      ? `AND pokemon_form_class IN ${arrayToMySQL(filter.formClass)}`
      : ``;

    // Typing
    const typeString = filter.types !== undefined && filter.types.length > 0
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

    // Genderless
    const genderlessString = filter.genderless !== undefined
      ? `AND pokemon_removed_from_bdsp = ${filter.genderless ? 'TRUE' : 'FALSE'}`
      : ``;

    extraFilterString = [
      maxWeightString,
      minWeightString,

      maxHeightString,
      minHeightString,

      maxDexString,
      minDexString,

      maxMaleRateString,
      minMaleRateString,

      maxFemaleRateString,
      minFemaleRateString,

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

      genderlessString,
    ].filter(d => d.length > 0).join('\n');
  }
  // Moves
  else if (tableName === 'pmove') {
    // Power
    const maxPowerString = filter.maxPower !== undefined
      ? filter.variablePower
        ? ``
        : `AND (pmove_power <= ${filter.maxPower} OR pmove_power IS NULL)`
      : ``;
    const minPowerString = filter.minPower !== undefined
      ? filter.variablePower
        ? ``
        : `AND (pmove_power >= ${filter.minPower} OR pmove_power IS NULL)`
      : ``;
    const variablePowerString = filter.variablePower !== undefined && filter.variablePower !== null
      ? filter.variablePower
        ? `AND pmove_power IS NULL`
        : `AND pmove_power IS NOT NULL`
      : ``;

    // PP
    const maxPPString = filter.maxPP !== undefined
      ? `AND pmove_pp <= ${filter.maxPP}`
      : ``;
    const minPPString = filter.minPP !== undefined
      ? `AND pmove_pp >= ${filter.minPP}`
      : ``;
    
    // Accuracy
    const maxAccuracyString = filter.maxAccuracy !== undefined
      ? filter.bypassAccuracy
        ? `AND (pmove_accuracy <= ${filter.maxAccuracy} OR pmove_accuracy IS NULL)`
        : ``
      : ``;
    const minAccuracyString = filter.minAccuracy !== undefined
      ? filter.bypassAccuracy
        ? ``
        : `AND (pmove_accuracy >= ${filter.minAccuracy} OR pmove_accuracy IS NULL)`
      : ``;
    const bypassAccuracyString = filter.bypassAccuracy !== undefined && filter.bypassAccuracy !== null
      ? filter.bypassAccuracy
        ? `AND pmove_accuracy IS NULL`
        : `AND pmove_accuracy IS NOT NULL`
      : ``;

    // Priority
    const maxPriorityString = filter.maxPriority !== undefined
      ? `AND pmove_priority <= ${filter.maxPriority}`
      : ``;
    const minPriorityString = filter.minPriority !== undefined
      ? `AND pmove_priority >= ${filter.minPriority}`
      : ``;

    // Category
    const categoryString = filter.category && filter.category.length > 0
      ? `AND pmove_category IN ${arrayToMySQL(filter.category)}`
      : ``;

    // Target
    const targetString = filter.target && filter.target.length > 0
      ? `AND pmove_target IN ${arrayToMySQL(filter.target)}`
      : ``;
      
    // Contact
    const contactString = filter.contact !== undefined
      ? `AND pmove_contact = ${filter.contact ? 'TRUE' : 'FALSE'}`
      : ``;

    // Types
    const typeString = filter.types && filter.types.length > 0
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
  // Effects
  else if (tableName === 'effect') {
    const effectClassString = filter.class !== undefined && filter.class.length > 0
      ? `AND effect_class IN ${arrayToMySQL(filter.class)}`
      : ``;

    extraFilterString = [
      effectClassString,
    ].filter(d => d.length > 0).join('\n');

  }
  // Statuses
  else if (tableName === 'pstatus') {
    const volatileString = filter.volatile !== undefined && filter.volatile !== null
      ? `AND pstatus_volatile = ${filter.volatile === true ? 'TRUE' : 'FALSE'}`
      : ``;

    extraFilterString = [
      volatileString,
    ].filter(d => d.length > 0).join('\n');
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