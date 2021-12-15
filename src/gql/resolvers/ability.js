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
  queryEntityByColumn,
  
  abilityEdge,
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
const abilityPK = parentPK('ability');

//#endregion

// Query
/*
    abilityByID(id)
    abilityByName(name)
    abilities(
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
  abilityByName: queryEntityByColumn('ability', 'name'),
  
  abilities: queryEntities('ability'),
}

//#endregion

// Ability
/*
    id
    descriptions
    pokemon
*/
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
  AbilityActivatedByFieldStateConnection: basicJunctionConnection('ability', 'fieldState', 'activatedBy'),
  AbilityActivatedByFieldStateEdge: basicEdge(),

  AbilityBoostsTypeConnection: basicJunctionConnection('ability', 'type', 'boosts'),
  AbilityBoostsTypeEdge: multiplierEdge(),

  AbilityBoostsUsageMethodConnection: basicJunctionConnection('ability', 'usageMethod', 'boosts'),
  AbilityBoostsUsageMethodEdge: multiplierEdge(),

  AbilityCausesStatusConnection: basicJunctionConnection('ability', 'status', 'causes'),
  AbilityCausesStatusEdge: causeStatusEdge(),

  AbilityCreatesFieldStateConnection: basicJunctionConnection('ability', 'fieldState', 'creates'),
  AbilityCreatesFieldStateEdge: turnsEdge(),
  
  AbilityEffectConnection: basicJunctionConnection('ability', 'effect'),
  AbilityEffectEdge: basicEdge(),
  
  AbilityGenerationConnection: generationConnection('ability'),
  AbilityGenerationEdge: basicEdge(),
  
  AbilityIgnoresFieldStateConnection: basicJunctionConnection('ability', 'fieldState', 'ignores'),
  AbilityIgnoresFieldStateEdge: basicEdge(),
  
  AbilityIntroductionConnection: introductionConnection('ability'),
  AbilityIntroductionEdge: basicEdge(),

  AbilityModifiesStatConnection: basicJunctionConnection('ability', 'stat', 'modifies'),
  AbilityModifiesStatEdge: modifyStatEdge(),

  AbilityPokemonConnection: basicJunctionConnection('ability', 'pokemon'),
  AbilityPokemonEdge: abilityEdge(),

  AbilityPreventsFieldStateConnection: basicJunctionConnection('ability', 'fieldState', 'prevents'),
  AbilityPreventsFieldStateEdge: basicEdge(),

  AbilityRemovesFieldStateConnection: basicJunctionConnection('ability', 'fieldState', 'removes'),
  AbilityRemovesFieldStateEdge: basicEdge(),
  
  AbilityResistsStatusConnection: basicJunctionConnection('ability', 'status', 'resists'),
  AbilityResistsStatusEdge: basicEdge(),

  AbilityResistsTypeConnection: basicJunctionConnection('ability', 'type', 'resists'),
  AbilityResistsTypeEdge: multiplierEdge(),
  
  AbilityResistsUsageMethodConnection: basicJunctionConnection('ability', 'usageMethod', 'resists'),
  AbilityResistsUsageMethodEdge: multiplierEdge(),

  AbilitySuppressesFieldStateConnection: basicJunctionConnection('ability', 'fieldState', 'suppresses'),
  AbilitySuppressesFieldStateEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Ability,
  ...ConnectionsAndEdges,
}