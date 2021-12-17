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
} = require('./helpers.js');
const fieldStatePK = parentPK('fieldState');

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
  
  fieldStates: queryEntities('fieldState'),
}

//#endregion

// FieldState
/*
    id
    descriptions
    pokemon
*/
//#region

const FieldState = {
  activatesAbility: fieldStatePK,
  
  activatesItem: fieldStatePK,

  boostsType: fieldStatePK,

  causesStatus: fieldStatePK,

  class: parent => parent.field_state_class,

  createdByAbility: fieldStatePK,

  createdByMove: fieldStatePK,

  damagePercent: parent => parent.field_state_damage_percent,

  effects: fieldStatePK,

  enhancesMove: fieldStatePK,

  extendedByItem: fieldStatePK,

  formattedName: parent => parent.ability_formatted_name,

  generation: parent => parent.generation_id,
  
  hindersMove: fieldStatePK,

  ignoredByAbility: fieldStatePK,

  ignoredByItem: fieldStatePK,

  introduced: parent => parent.introduced,

  maxLayers: parent => parent.field_state_max_layers,
  
  modifiesStat: fieldStatePK,

  name: parent => parent.field_state_name,

  grounded: parent => parent.field_state_only_grounded,

  preventedByAbility: fieldStatePK,

  removedByAbility: fieldStatePK,

  removedByMove: fieldStatePK,

  resistedByItem: fieldStatePK,

  resistsStatus: fieldStatePK,

  resistsType: fieldStatePK,

  suppressedByAbility: fieldStatePK,

  target: parent => parent.field_state_target,

  weatherBall: fieldStatePK,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  FieldStateActivatesAbilityConnection: junctionConnection('fieldState', 'ability', 'activates'),
  FieldStateActivatesAbilityEdge: basicEdge(),

  FieldStateActivatesItemConnection: junctionConnection('fieldState', 'item', 'activates'),
  FieldStateActivatesItemEdge: basicEdge(),

  FieldStateBoostsTypeConnection: junctionConnection('fieldState', 'type', 'boosts'),
  FieldStateBoostsTypeEdge: multiplierEdge(),

  FieldStateCausesStatusConnection: junctionConnection('fieldState', 'status', 'causes'),
  FieldStateCausesStatusEdge: causeStatusEdge(),

  FieldStateCreatedByAbilityConnection: junctionConnection('fieldState', 'ability', 'createdBy'),
  FieldStateCreatedByAbilityEdge: turnsEdge(),

  FieldStateCreatedByMoveConnection: junctionConnection('fieldState', 'move', 'createdBy'),
  FieldStateCreatedByMoveEdge: turnsEdge(),
  
  FieldStateEffectConnection: junctionConnection('fieldState', 'effect'),
  FieldStateEffectEdge: basicEdge(),

  FieldStateEnhancesMoveConnection: junctionConnection('fieldState', 'move', 'enhances'),
  FieldStateEnhancesMoveEdge: basicEdge(),
  
  FieldStateExtendedByItemConnection: junctionConnection('fieldState', 'item', 'extendedBy'),
  FieldStateExtendedByItemEdge: turnsEdge(),
  
  FieldStateGenerationConnection: generationConnection('fieldState'),
  FieldStateGenerationEdge: basicEdge(),

  FieldStateHindersMoveConnection: junctionConnection('fieldState', 'move', 'hinders'),
  FieldStateHindersMoveEdge: basicEdge(),

  FieldStateIgnoredByAbilityConnection: junctionConnection('fieldState', 'ability', 'ignoredBy'),
  FieldStateIgnoredByAbilityEdge: basicEdge(),

  FieldStateIgnoredByItemConnection: junctionConnection('fieldState', 'item', 'ignoredBy'),
  FieldStateIgnoredByItemEdge: basicEdge(),
  
  FieldStateIntroductionConnection: introductionConnection('fieldState'),
  FieldStateIntroductionEdge: basicEdge(),

  FieldStateModifiesStatConnection: junctionConnection('fieldState', 'stat', 'modifies'),
  FieldStateModifiesStatEdge: modifyStatEdge(),

  FieldStatePreventedByAbilityConnection: junctionConnection('fieldState', 'ability', 'preventedBy'),
  FieldStatePreventedByAbilityEdge: basicEdge(),

  FieldStateRemovedByAbilityConnection: junctionConnection('fieldState', 'ability', 'removedBy'),
  FieldStateRemovedByAbilityEdge: basicEdge(),

  FieldStateRemovedByMoveConnection: junctionConnection('fieldState', 'move', 'removedBy'),
  FieldStateRemovedByMoveEdge: basicEdge(),

  FieldStateResistedByItemConnection: junctionConnection('fieldState', 'item', 'resistedBy'),
  FieldStateResistedByItemEdge: multiplierEdge(),
  
  FieldStateResistsStatusConnection: junctionConnection('fieldState', 'status', 'resists'),
  FieldStateResistsStatusEdge: basicEdge(),

  FieldStateResistsTypeConnection: junctionConnection('fieldState', 'type', 'resists'),
  FieldStateResistsTypeEdge: multiplierEdge(),

  FieldStateSuppressedByAbilityConnection: junctionConnection('fieldState', 'ability', 'suppressedBy'),
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