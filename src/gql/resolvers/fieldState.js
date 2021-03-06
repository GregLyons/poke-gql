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
  topLevelConnection,
  
  parentPK,
  parentPKDebut,
  primaryKeyToID,
  topLevelBulkQuery,
} = require('./helpers.js');
const fieldStatePK = parentPK('fieldState')
const fieldStatePKDebut = parentPKDebut('fieldState');
const getID = primaryKeyToID('fieldState');

//#endregion

// Query
//#region

const Query = {
  fieldStateByName: queryEntitiesByColumn('fieldState', 'name'),

  fieldStatesByName: queryEntitiesByColumn('fieldState', 'names'),
  
  fieldStates: topLevelBulkQuery('fieldState'),
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

  description: parent => parent.field_state_description,

  effects: fieldStatePK,

  enhancesMove: fieldStatePK,

  extendedByItem: fieldStatePK,

  formattedName: parent => parent.field_state_formatted_name,

  generation: fieldStatePK,

  grounded: parent => parent.field_state_only_grounded,
  
  hindersMove: fieldStatePK,

  ignoredByAbility: fieldStatePK,

  ignoredByItem: fieldStatePK,

  ignoredByType: fieldStatePK,

  introduced: fieldStatePKDebut,

  maxLayers: parent => parent.field_state_max_layers,
  
  modifiesStat: fieldStatePK,

  name: parent => parent.field_state_name,

  preventedByAbility: fieldStatePK,

  removedByAbility: fieldStatePK,

  removedByMove: fieldStatePK,

  removedByType: fieldStatePK,

  resistedByItem: fieldStatePK,

  resistedByType: fieldStatePK,

  resistsStatus: fieldStatePK,
  
  suppressedByAbility: fieldStatePK,
  
  target: parent => parent.field_state_target.toUpperCase(),

  unformattedName: parent => parent.field_state_unformatted_name,

  weakensType: fieldStatePK,

  weatherBall: fieldStatePK,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  FieldStateConnection: topLevelConnection('fieldState'),
  FieldStateEdge: basicEdge(),

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

  FieldStateIgnoredByTypeConnection: junctionConnection('fieldState', 'ignoredByType'),
  FieldStateIgnoredByTypeEdge: basicEdge(),
  
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

  FieldStateRemovedByTypeConnection: junctionConnection('fieldState', 'ignoredByType'),
  FieldStateRemovedByTypeEdge: basicEdge(),
  
  FieldStateResistedByItemConnection: junctionConnection('fieldState', 'resistedByItem'),
  FieldStateResistedByItemEdge: multiplierEdge(),

  FieldStateResistedByTypeConnection: junctionConnection('fieldState', 'resistedByType'),
  FieldStateResistedByTypeEdge: multiplierEdge(),
  
  FieldStateResistsStatusConnection: junctionConnection('fieldState', 'resistsStatus'),
  FieldStateResistsStatusEdge: basicEdge(),
  
  FieldStateSuppressedByAbilityConnection: junctionConnection('fieldState', 'suppressedByAbility'),
  FieldStateSuppressedByAbilityEdge: basicEdge(),

  FieldStateWeakensTypeConnection: junctionConnection('fieldState', 'weakensType'),
  FieldStateWeakensTypeEdge: multiplierEdge(),

  FieldStateWeatherBallConnection: junctionConnection('fieldState', 'weatherBall'),
  FieldStateWeatherBallEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  FieldState,
  ...ConnectionsAndEdges,
}