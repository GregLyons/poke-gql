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

const {
  parentPK,
  
  basicEdge,
  multiplierEdge,
  
  basicJunctionConnection,
  introductionConnection,
} = require('./helpers.js');
const usageMethodPK = parentPK('usageMethod');

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

// UsageMethod
/*
    id
*/
//#region

const UsageMethod = {
  abilityBoosts: usageMethodPK,

  abilityResists: usageMethodPK,

  formattedName: async (parent, args, context, info) => {
    return parent.usage_method_formatted_name;
  },
  
  introduced: async (parent, args, context, info) => {
    return parent.introduced;
  },

  itemBoosts: usageMethodPK,

  itemResists: usageMethodPK,

  moves: usageMethodPK,
  
  name: async (parent, args, context, info) => {
    return parent.usage_method_name
  },
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  UsageMethodBoostedByAbilityConnection: basicJunctionConnection('usageMethod', 'ability', 'boostedBy'),
  UsageMethodBoostedByAbilityEdge: multiplierEdge(),

  UsageMethodBoostedByItemConnection: basicJunctionConnection('usageMethod', 'item', 'boostedBy'),
  UsageMethodBoostedByItemEdge: multiplierEdge(),

  UsageMethodGenerationConnection: introductionConnection('usageMethod'),
  UsageMethodGenerationEdge: basicEdge(),

  UsageMethodMoveConnection: basicJunctionConnection('usageMethod', 'move'),
  UsageMethodMoveEdge: basicEdge(),
  
  UsageMethodResistedByAbilityConnection: basicJunctionConnection('usageMethod', 'ability', 'resistedBy'),
  UsageMethodResistedByAbilityEdge: multiplierEdge(),

  UsageMethodResistedByItemConnection: basicJunctionConnection('usageMethod', 'item', 'resistedBy'),
  UsageMethodResistedByItemEdge: multiplierEdge(),
}

//#endregion

module.exports = {
  Query,
  UsageMethod,
  ...ConnectionsAndEdges,
}