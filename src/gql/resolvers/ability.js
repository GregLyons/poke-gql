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
  abilityByName: queryEntitiesByColumn('ability', 'name'),
  
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
  AbilityActivatedByFieldStateConnection: junctionConnection('ability', 'fieldState', 'activatedBy'),
  AbilityActivatedByFieldStateEdge: basicEdge(),

  AbilityBoostsTypeConnection: junctionConnection('ability', 'type', 'boosts'),
  AbilityBoostsTypeEdge: multiplierEdge(),

  AbilityBoostsUsageMethodConnection: junctionConnection('ability', 'usageMethod', 'boosts'),
  AbilityBoostsUsageMethodEdge: multiplierEdge(),

  AbilityCausesStatusConnection: junctionConnection('ability', 'status', 'causes'),
  AbilityCausesStatusEdge: causeStatusEdge(),

  AbilityCreatesFieldStateConnection: junctionConnection('ability', 'fieldState', 'creates'),
  AbilityCreatesFieldStateEdge: turnsEdge(),

  AbilityDescriptionConnection: junctionConnection('ability', 'description'),
  AbilityDescriptionEdge: descriptionEdge(),
  
  AbilityEffectConnection: junctionConnection('ability', 'effect'),
  AbilityEffectEdge: basicEdge(),
  
  AbilityGenerationConnection: generationConnection('ability'),
  AbilityGenerationEdge: basicEdge(),
  
  AbilityIgnoresFieldStateConnection: junctionConnection('ability', 'fieldState', 'ignores'),
  AbilityIgnoresFieldStateEdge: basicEdge(),
  
  AbilityIntroductionConnection: introductionConnection('ability'),
  AbilityIntroductionEdge: basicEdge(),

  AbilityModifiesStatConnection: junctionConnection('ability', 'stat', 'modifies'),
  AbilityModifiesStatEdge: modifyStatEdge(),

  AbilityPokemonConnection: junctionConnection('ability', 'pokemon'),
  AbilityPokemonEdge: abilityEdge(),

  AbilityPreventsFieldStateConnection: junctionConnection('ability', 'fieldState', 'prevents'),
  AbilityPreventsFieldStateEdge: basicEdge(),

  AbilityRemovesFieldStateConnection: junctionConnection('ability', 'fieldState', 'removes'),
  AbilityRemovesFieldStateEdge: basicEdge(),
  
  AbilityResistsStatusConnection: junctionConnection('ability', 'status', 'resists'),
  AbilityResistsStatusEdge: basicEdge(),

  AbilityResistsTypeConnection: junctionConnection('ability', 'type', 'resists'),
  AbilityResistsTypeEdge: multiplierEdge(),
  
  AbilityResistsUsageMethodConnection: junctionConnection('ability', 'usageMethod', 'resists'),
  AbilityResistsUsageMethodEdge: multiplierEdge(),

  AbilitySuppressesFieldStateConnection: junctionConnection('ability', 'fieldState', 'suppresses'),
  AbilitySuppressesFieldStateEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Ability,
  ...ConnectionsAndEdges,
}