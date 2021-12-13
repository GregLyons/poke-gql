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
  basicEdge,
  causeStatusEdge,
  modifyStatEdge,
  multiplierEdge,

  basicJunctionConnection,
  generationConnection,
  introductionConnection,

  parentGenID,
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
  abilityByName: async (parent, { generation, name }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM ability
        WHERE generation_id = ${generation}
        AND ability_name = '${name.toLowerCase()}'
      `
    )
    .then( ([results, fields]) => {
      return results[0];
    })
    .catch(console.log);
  },

  // TODO: cursor
  abilities: async (parent, { generation }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM ability
        WHERE generation_id = ${generation}
      `
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);
  },
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

  formattedName: async (parent, args, context, info) => {
    return parent.ability_formatted_name;
  },

  generation: parentGenID,
  
  introduced: parent => parent.introduced,
  
  modifiesStat: abilityPK,

  name: async (parent, args, context, info) => {
    return parent.ability_name
  },

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