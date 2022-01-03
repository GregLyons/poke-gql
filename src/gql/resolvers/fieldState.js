/* 
  Resolvers for FieldState.

  db is a mysql2 database instance. 

  The 'field_state' table has columns:
    'generation_id'
    'field_state_id'
    'field_state_name'
    'field_state_formatted_name'
    'introduced'
    'field_state_damage_percent'
    'field_state_max_layers'
    'field_state_only_grounded'
    'field_state_class'
    'field_state_target'
*/

// Import helpers
//#region

const {
  queryEntities,
  queryEntitiesByColumn,
  
  basicEdge,
  causeStatusEdge,
  modifyStatEdge,
  multiplierEdge,
  turnsEdge,

  junctionConnection,
  generationConnection,
  introductionConnection,
  
  parentPK,
  primaryKeyToID,
} = require('./helpers.js');
const fieldStatePK = parentPK('fieldState');
const getID = primaryKeyToID('fieldState');

//#endregion

// Query
/*
    fieldStateByID(id)
    fieldStateByName(name)
    fieldStates(
      cursor,
      limit,
      generation,
      contains,
      endsWith,
      introducedAfter,
      introducedBefore,
      startsWith
    )
*/
//#region

const Query = {
  fieldStateByName: queryEntitiesByColumn('fieldState', 'name'),

  fieldStatesByName: queryEntitiesByColumn('fieldState', 'names'),
  
  fieldStates: queryEntities('fieldState'),
}

//#endregion

// FieldState
//#region

const FieldState = {
  id: getID,

  activatesAbility: fieldStatePK,
  
  activatesItem: fieldStatePK,

  boostsType: fieldStatePK,

  causesStatus: fieldStatePK,

  class: parent => parent.field_state_class.toUpperCase(),

  createdByAbility: fieldStatePK,

  createdByMove: fieldStatePK,

  damagePercent: parent => parent.field_state_damage_percent,

  effects: fieldStatePK,

  enhancesMove: fieldStatePK,

  extendedByItem: fieldStatePK,

  formattedName: parent => parent.field_state_formatted_name,

  generation: parent => parent.generation_id,

  grounded: parent => parent.field_state_only_grounded,
  
  hindersMove: fieldStatePK,

  ignoredByAbility: fieldStatePK,

  ignoredByItem: fieldStatePK,

  introduced: parent => parent.introduced,

  maxLayers: parent => parent.field_state_max_layers,
  
  modifiesStat: fieldStatePK,

  name: parent => parent.field_state_name,

  preventedByAbility: fieldStatePK,

  removedByAbility: fieldStatePK,

  removedByMove: fieldStatePK,

  resistedByItem: fieldStatePK,

  resistsStatus: fieldStatePK,

  resistsType: fieldStatePK,

  suppressedByAbility: fieldStatePK,

  target: parent => parent.field_state_target.toUpperCase(),

  weatherBall: fieldStatePK,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  FieldStateActivatesAbilityConnection: junctionConnection('fieldState', 'activatesAbility'),
  FieldStateActivatesAbilityEdge: basicEdge(),

  FieldStateActivatesItemConnection: junctionConnection('fieldState', 'activatesItem'),
  FieldStateActivatesItemEdge: basicEdge(),

  FieldStateBoostsTypeConnection: junctionConnection('fieldState', 'boostsType'),
  FieldStateBoostsTypeEdge: multiplierEdge(),

  FieldStateCausesStatusConnection: junctionConnection('fieldState', 'causesStatus'),
  FieldStateCausesStatusEdge: causeStatusEdge(),

  FieldStateCreatedByAbilityConnection: junctionConnection('fieldState', 'createdByAbility'),
  FieldStateCreatedByAbilityEdge: turnsEdge(),

  FieldStateCreatedByMoveConnection: junctionConnection('fieldState', 'createdByMove'),
  FieldStateCreatedByMoveEdge: turnsEdge(),
  
  FieldStateEffectConnection: junctionConnection('fieldState', 'effect'),
  FieldStateEffectEdge: basicEdge(),

  FieldStateEnhancesMoveConnection: junctionConnection('fieldState', 'enhancesMove'),
  FieldStateEnhancesMoveEdge: basicEdge(),
  
  FieldStateExtendedByItemConnection: junctionConnection('fieldState', 'extendedByItem'),
  FieldStateExtendedByItemEdge: turnsEdge(),
  
  FieldStateGenerationConnection: generationConnection('fieldState'),
  FieldStateGenerationEdge: basicEdge(),

  FieldStateHindersMoveConnection: junctionConnection('fieldState', 'hindersMove'),
  FieldStateHindersMoveEdge: basicEdge(),

  FieldStateIgnoredByAbilityConnection: junctionConnection('fieldState', 'ignoredByAbility'),
  FieldStateIgnoredByAbilityEdge: basicEdge(),

  FieldStateIgnoredByItemConnection: junctionConnection('fieldState', 'ignoredByItem'),
  FieldStateIgnoredByItemEdge: basicEdge(),
  
  FieldStateIntroductionConnection: introductionConnection('fieldState'),
  FieldStateIntroductionEdge: basicEdge(),

  FieldStateModifiesStatConnection: junctionConnection('fieldState', 'modifiesStat'),
  FieldStateModifiesStatEdge: modifyStatEdge(),

  FieldStatePreventedByAbilityConnection: junctionConnection('fieldState', 'preventedByAbility'),
  FieldStatePreventedByAbilityEdge: basicEdge(),

  FieldStateRemovedByAbilityConnection: junctionConnection('fieldState', 'removedByAbility'),
  FieldStateRemovedByAbilityEdge: basicEdge(),

  FieldStateRemovedByMoveConnection: junctionConnection('fieldState', 'removedByMove'),
  FieldStateRemovedByMoveEdge: basicEdge(),

  FieldStateResistedByItemConnection: junctionConnection('fieldState', 'resistedByItem'),
  FieldStateResistedByItemEdge: multiplierEdge(),
  
  FieldStateResistsStatusConnection: junctionConnection('fieldState', 'resistsStatus'),
  FieldStateResistsStatusEdge: basicEdge(),

  FieldStateResistsTypeConnection: junctionConnection('fieldState', 'resistsType'),
  FieldStateResistsTypeEdge: multiplierEdge(),

  FieldStateSuppressedByAbilityConnection: junctionConnection('fieldState', 'suppressedByAbility'),
  FieldStateSuppressedByAbilityEdge: basicEdge(),

  FieldStateWeatherBallConnection: junctionConnection('fieldState', 'weatherBall'),
  FieldStateWeatherBallEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  FieldState,
  ...ConnectionsAndEdges,
}