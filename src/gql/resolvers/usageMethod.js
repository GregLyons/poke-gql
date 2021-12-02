/* 
  Resolvers for UsageMethod.

  db is a mysql2 database instance. 

  The 'usage_method' table has columns:
    'usage_method_id'
    'usage_method_name'
    'usage_method_formatted_name'
    'introduced'
*/

// Import helpers
//#region

const {entityNameToTableName, introductionConnection, basicEdge} = require('./helpers.js');

//#endregion

// Query
/*
    usageMethodByID(id)
    usageMethodByName(name)
    usageMethods(
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
  usageMethodByName: async (parent, { name }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM usage_method
        WHERE usage_method_name = '${name.toLowerCase()}'
      `
    )
    .then( ([results, fields]) => {
      return results[0];
    })
    .catch(console.log);
  },

  // TODO: cursor
  usageMethods: async (parent, { generation }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM usage_method
      `
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);
  },
}

//#endregion

// UsageMethod
/*
    id
    abilityBoosts
    abilityResists
    formattedName
    introduced
    itemBoosts
    itemResists
    moves
    name
*/
//#region

const UsageMethod = {
  formattedName: async (parent, args, context, info) => {
    return parent.usage_method_formatted_name;
  },
  
  introduced: async (parent, args, context, info) => {
    return parent.introduced;
  },
  
  name: async (parent, args, context, info) => {
    return parent.usage_method_name
  },
}

//#endregion

// Connections and edges
/*

*/
//#region

const ConnectionsAndEdges = {
  UsageMethodGenerationConnection: introductionConnection('usageMethod'),
  UsageMethodGenerationEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  UsageMethod,
  ...ConnectionsAndEdges,
}