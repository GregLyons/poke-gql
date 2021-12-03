/* 
  Resolvers for Effect.

  db is a mysql2 database instance. 

  The 'effect' table has columns:
    'effect_id'
    'effect_name'
    'effect_formatted_name'
    'introduced'
*/

// Import helpers
//#region

const {
  parentPK,
  
  basicEdge,

  basicJunctionConnection,
  introductionConnection,
} = require('./helpers.js');
const effectPK = parentPK('effect');

//#endregion

// Query
/*
    effectByID(id)
    effectByName(name)
    effects(
      cursor,
      limit,
      contains,
      endsWith,
      introducedAfter,
      introducedBefore,
      startsWith
    )
*/
//#region

const Query = {
  effectByName: async (parent, { name }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM effect
        WHERE effect_name = '${name.toLowerCase()}'
      `
    )
    .then( ([results, fields]) => {
      return results[0];
    })
    .catch(console.log);
  },

  // TODO: cursor
  effects: async (parent, { generation }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM effect
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

// Effect
/*
    id
*/
//#region

const Effect = {
  abilities: effectPK,

  formattedName: async (parent, args, context, info) => {
    return parent.effect_formatted_name;
  },
  
  introduced: async (parent, args, context, info) => {
    return parent.introduced;
  },
  
  name: async (parent, args, context, info) => {
    return parent.effect_name
  },

  items: effectPK,

  moves: effectPK,
}

//#endregion

// Connections and edges
/*

*/
//#region

const ConnectionsAndEdges = {
  EffectAbilityConnection: basicJunctionConnection('effect', 'ability'),
  EffectAbilityEdge: basicEdge(),
  
  EffectGenerationConnection: introductionConnection('effect'),
  EffectGenerationEdge: basicEdge(),

  EffectItemConnection: basicJunctionConnection('effect', 'item'),
  EffectItemEdge: basicEdge(),

  EffectMoveConnection: basicJunctionConnection('effect', 'move'),
  EffectMoveEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Effect,
  ...ConnectionsAndEdges,
}