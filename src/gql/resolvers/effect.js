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

const {entityNameToTableName, introductionConnection, basicEdge} = require('./helpers.js');

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
    abilities
    formattedName
    introduced
    items
    moves
    name
*/
//#region

const Effect = {
  formattedName: async (parent, args, context, info) => {
    return parent.effect_formatted_name;
  },
  
  introduced: async (parent, args, context, info) => {
    return parent.introduced;
  },
  
  name: async (parent, args, context, info) => {
    return parent.effect_name
  },
}

//#endregion

// Connections and edges
/*

*/
//#region

const ConnectionsAndEdges = {
  EffectGenerationConnection: introductionConnection('effect'),
  EffectGenerationEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Effect,
  ...ConnectionsAndEdges,
}