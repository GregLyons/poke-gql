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
  
  parentPK,
} = require('./helpers.js');
const abilityPK = parentPK('ability');

//#endregion

// Query
//#region

const Query = {
  abilityByName: queryEntitiesByColumn('ability', 'name'),
  
  abilities: queryEntities('ability'),
}

//#endregion

// Ability
//#region

const Ability = {
  activatedByFieldState: abilityPK,

  boostsType: abilityPK,

  boostsUsageMethod: abilityPK,

  causesStatus: abilityPK,

  createsFieldState: abilityPK,

  descriptions: abilityPK,

  effects: abilityPK,

  formattedName: parent => parent.ability_formatted_name,

  generation: parent => parent.generation_id,

  ignoresFieldState: abilityPK,
  
  introduced: parent => parent.introduced,
  
  modifiesStat: abilityPK,

  name: parent => parent.ability_name,

  pokemon: abilityPK,

  preventsFieldState: abilityPK,

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
  AbilityActivatedByFieldStateConnection: junctionConnection('ability', 'activatedByFieldState'),
  AbilityActivatedByFieldStateEdge: basicEdge(),

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