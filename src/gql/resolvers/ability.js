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
  introductionConnection,
  basicJunctionConnection,
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
    boostsType(input)
    boostsUsageMethod(input)
    causesStatus(input)
    descriptions(input)
    effect(input)
    formattedName
    introduced(input)
    modifiesStat(input)
    name
    resistsType(input)
    resistsUsageMethod(input)
    resistsStatus(input)
*/
//#region

const Ability = {
  effects: abilityPK,

  formattedName: async (parent, args, context, info) => {
    return parent.ability_formatted_name;
  },
  
  introduced: async (parent, args, context, info) => {
    return parent.introduced;
  },
  
  name: async (parent, args, context, info) => {
    return parent.ability_name
  },
}

//#endregion

// Connections and edges
/*

*/
//#region

const ConnectionsAndEdges = {
  AbilityGenerationConnection: introductionConnection('ability'),
  AbilityGenerationEdge: basicEdge(),

  AbilityEffectConnection: basicJunctionConnection('ability', 'effect'),
  AbilityEffectEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Ability,
  ...ConnectionsAndEdges,
}