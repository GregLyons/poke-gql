/* 
  Resolvers for Ability.

  db is a mysql2 database instance. 

  The 'ability' table has columns:
    'generation_id'
    'ability_id'
    'ability_name'
    'ability_formatted_name'
    'introduced'
*/

// Import helpers
//#region

const {
  queryEntities,
  queryEntitiesByColumn,
  
  abilityEdge,
  basicEdge,
  causeStatusEdge,
  descriptionEdge,
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
const abilityPK = parentPK('ability')
const abilityPKDebut = parentPKDebut('ability');
const getID = primaryKeyToID('ability');

//#endregion

// Query
//#region

const Query = {
  abilityByName: queryEntitiesByColumn('ability', 'name'),

  abilitiesByName: queryEntitiesByColumn('ability', 'names'),

  abilityByPSID: queryEntitiesByColumn('ability', 'psID'),

  abilitiesByPSID: queryEntitiesByColumn('ability', 'psIDs'),
  
  abilities: topLevelBulkQuery('ability'),
}

//#endregion

// Ability
//#region

const Ability = {
  id: getID,

  activatedByFieldState: abilityPK,

  activatedByUsageMethod: abilityPK,

  boostsType: abilityPK,

  boostsUsageMethod: abilityPK,

  causesStatus: abilityPK,

  createsFieldState: abilityPK,

  descriptions: abilityPK,

  effects: abilityPK,

  formattedName: parent => parent.ability_formatted_name,

  generation: abilityPK,

  ignoresFieldState: abilityPK,
  
  introduced: abilityPKDebut,
  
  modifiesStat: abilityPK,

  name: parent => parent.ability_name,

  pokemon: abilityPK,

  psID: parent => parent.ability_ps_id,

  preventsFieldState: abilityPK,

  preventsUsageMethod: abilityPK,

  removesFieldState: abilityPK,

  resistsStatus: abilityPK,

  resistsType: abilityPK,

  resistsUsageMethod: abilityPK,

  suppressesFieldState: abilityPK,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  AbilityConnection: topLevelConnection('ability'),
  AbilityEdge: basicEdge(),

  AbilityActivatedByFieldStateConnection: junctionConnection('ability', 'activatedByFieldState'),
  AbilityActivatedByFieldStateEdge: basicEdge(),

  AbilityActivatedByUsageMethodConnection: junctionConnection('ability', 'activatedByUsageMethod'),
  AbilityActivatedByUsageMethodEdge: basicEdge(),

  AbilityBoostsTypeConnection: junctionConnection('ability', 'boostsType'),
  AbilityBoostsTypeEdge: multiplierEdge(),

  AbilityBoostsUsageMethodConnection: junctionConnection('ability', 'boostsUsageMethod'),
  AbilityBoostsUsageMethodEdge: multiplierEdge(),

  AbilityCausesStatusConnection: junctionConnection('ability', 'causesStatus'),
  AbilityCausesStatusEdge: causeStatusEdge(),

  AbilityCreatesFieldStateConnection: junctionConnection('ability', 'createsFieldState'),
  AbilityCreatesFieldStateEdge: turnsEdge(),

  AbilityDescriptionConnection: junctionConnection('ability', 'description'),
  AbilityDescriptionEdge: descriptionEdge(),
  
  AbilityEffectConnection: junctionConnection('ability', 'effect'),
  AbilityEffectEdge: basicEdge(),
  
  AbilityGenerationConnection: generationConnection('ability'),
  AbilityGenerationEdge: basicEdge(),
  
  AbilityIgnoresFieldStateConnection: junctionConnection('ability', 'ignoresFieldState'),
  AbilityIgnoresFieldStateEdge: basicEdge(),
  
  AbilityIntroductionConnection: introductionConnection('ability'),
  AbilityIntroductionEdge: basicEdge(),

  AbilityModifiesStatConnection: junctionConnection('ability', 'modifiesStat'),
  AbilityModifiesStatEdge: modifyStatEdge(),

  AbilityPokemonConnection: junctionConnection('ability', 'pokemon'),
  AbilityPokemonEdge: abilityEdge(),

  AbilityPreventsFieldStateConnection: junctionConnection('ability', 'preventsFieldState'),
  AbilityPreventsFieldStateEdge: basicEdge(),

  AbilityPreventsUsageMethodConnection: junctionConnection('ability', 'preventsUsageMethod'),
  AbilityPreventsUsageMethodEdge: basicEdge(),

  AbilityRemovesFieldStateConnection: junctionConnection('ability', 'removesFieldState'),
  AbilityRemovesFieldStateEdge: basicEdge(),
  
  AbilityResistsStatusConnection: junctionConnection('ability', 'resistsStatus'),
  AbilityResistsStatusEdge: basicEdge(),

  AbilityResistsTypeConnection: junctionConnection('ability', 'resistsType'),
  AbilityResistsTypeEdge: multiplierEdge(),
  
  AbilityResistsUsageMethodConnection: junctionConnection('ability', 'resistsUsageMethod'),
  AbilityResistsUsageMethodEdge: multiplierEdge(),

  AbilitySuppressesFieldStateConnection: junctionConnection('ability', 'suppressesFieldState'),
  AbilitySuppressesFieldStateEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Ability,
  ...ConnectionsAndEdges,
}