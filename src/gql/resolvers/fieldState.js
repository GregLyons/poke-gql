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

  basicJunctionConnection,
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
  FieldStateActivatesAbilityConnection: basicJunctionConnection('fieldState', 'ability', 'activates'),
  FieldStateActivatesAbilityEdge: basicEdge(),

  FieldStateActivatesItemConnection: basicJunctionConnection('fieldState', 'item', 'activates'),
  FieldStateActivatesItemEdge: basicEdge(),

  FieldStateBoostsTypeConnection: basicJunctionConnection('fieldState', 'type', 'boosts'),
  FieldStateBoostsTypeEdge: multiplierEdge(),

  FieldStateCausesStatusConnection: basicJunctionConnection('fieldState', 'status', 'causes'),
  FieldStateCausesStatusEdge: causeStatusEdge(),

  FieldStateCreatedByAbilityConnection: basicJunctionConnection('fieldState', 'ability', 'createdBy'),
  FieldStateCreatedByAbilityEdge: turnsEdge(),

  FieldStateCreatedByMoveConnection: basicJunctionConnection('fieldState', 'move', 'createdBy'),
  FieldStateCreatedByMoveEdge: turnsEdge(),
  
  FieldStateEffectConnection: basicJunctionConnection('fieldState', 'effect'),
  FieldStateEffectEdge: basicEdge(),

  FieldStateEnhancesMoveConnection: basicJunctionConnection('fieldState', 'move', 'enhances'),
  FieldStateEnhancesMoveEdge: basicEdge(),
  
  FieldStateExtendedByItemConnection: basicJunctionConnection('fieldState', 'item', 'extendedBy'),
  FieldStateExtendedByItemEdge: turnsEdge(),
  
  FieldStateGenerationConnection: generationConnection('fieldState'),
  FieldStateGenerationEdge: basicEdge(),

  FieldStateHindersMoveConnection: basicJunctionConnection('fieldState', 'move', 'hinders'),
  FieldStateHindersMoveEdge: basicEdge(),

  FieldStateIgnoredByAbilityConnection: basicJunctionConnection('fieldState', 'ability', 'ignoredBy'),
  FieldStateIgnoredByAbilityEdge: basicEdge(),

  FieldStateIgnoredByItemConnection: basicJunctionConnection('fieldState', 'item', 'ignoredBy'),
  FieldStateIgnoredByItemEdge: basicEdge(),
  
  FieldStateIntroductionConnection: introductionConnection('fieldState'),
  FieldStateIntroductionEdge: basicEdge(),

  FieldStateModifiesStatConnection: basicJunctionConnection('fieldState', 'stat', 'modifies'),
  FieldStateModifiesStatEdge: modifyStatEdge(),

  FieldStatePreventedByAbilityConnection: basicJunctionConnection('fieldState', 'ability', 'preventedBy'),
  FieldStatePreventedByAbilityEdge: basicEdge(),

  FieldStateRemovedByAbilityConnection: basicJunctionConnection('fieldState', 'ability', 'removedBy'),
  FieldStateRemovedByAbilityEdge: basicEdge(),

  FieldStateRemovedByMoveConnection: basicJunctionConnection('fieldState', 'move', 'removedBy'),
  FieldStateRemovedByMoveEdge: basicEdge(),

  FieldStateResistedByItemConnection: basicJunctionConnection('fieldState', 'item', 'resistedBy'),
  FieldStateResistedByItemEdge: multiplierEdge(),
  
  FieldStateResistsStatusConnection: basicJunctionConnection('fieldState', 'status', 'resists'),
  FieldStateResistsStatusEdge: basicEdge(),

  FieldStateResistsTypeConnection: basicJunctionConnection('fieldState', 'type', 'resists'),
  FieldStateResistsTypeEdge: multiplierEdge(),

  FieldStateSuppressedByAbilityConnection: basicJunctionConnection('fieldState', 'ability', 'suppressedBy'),
  FieldStateSuppressedByAbilityEdge: basicEdge(),

  FieldStateWeatherBallConnection: basicJunctionConnection('fieldState', 'weatherBall'),
  FieldStateWeatherBallEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  FieldState,
  ...ConnectionsAndEdges,
}