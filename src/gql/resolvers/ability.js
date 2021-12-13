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
  boostsType: abilityPK,

  boostsUsageMethod: abilityPK,

  causesStatus: abilityPK,

  descriptions: abilityPK,

  effects: abilityPK,

  formattedName: parent => parent.ability_formatted_name,

  generation: parent => parent.generation_id,
  
  introduced: parent => parent.introduced,
  
  modifiesStat: abilityPK,

  name: parent => parent.ability_name,

  pokemon: abilityPK,

  resistsStatus: abilityPK,

  resistsType: abilityPK,

  resistsUsageMethod: abilityPK,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  AbilityBoostsTypeConnection: basicJunctionConnection('ability', 'type', 'boosts'),
  AbilityBoostsTypeEdge: multiplierEdge(),

  AbilityBoostsUsageMethodConnection: basicJunctionConnection('ability', 'usageMethod', 'boosts'),
  AbilityBoostsUsageMethodEdge: multiplierEdge(),

  AbilityCausesStatusConnection: basicJunctionConnection('ability', 'status', 'causes'),
  AbilityCausesStatusEdge: causeStatusEdge(),
  
  AbilityEffectConnection: basicJunctionConnection('ability', 'effect'),
  AbilityEffectEdge: basicEdge(),

  AbilityGenerationConnection: generationConnection('ability'),
  AbilityGenerationEdge: basicEdge(),
  
  AbilityIntroductionConnection: introductionConnection('ability'),
  AbilityIntroductionEdge: basicEdge(),

  AbilityModifiesStatConnection: basicJunctionConnection('ability', 'stat', 'modifies'),
  AbilityModifiesStatEdge: modifyStatEdge(),

  AbilityPokemonConnection: basicJunctionConnection('ability', 'pokemon'),
  AbilityPokemonEdge: abilityEdge(),
  
  AbilityResistsStatusConnection: basicJunctionConnection('ability', 'status', 'resists'),
  AbilityResistsStatusEdge: basicEdge(),

  AbilityResistsTypeConnection: basicJunctionConnection('ability', 'type', 'resists'),
  AbilityResistsTypeEdge: multiplierEdge(),
  
  AbilityResistsUsageMethodConnection: basicJunctionConnection('ability', 'usageMethod', 'resists'),
  AbilityResistsUsageMethodEdge: multiplierEdge(),
}

//#endregion

module.exports = {
  Query,
  Ability,
  ...ConnectionsAndEdges,
}