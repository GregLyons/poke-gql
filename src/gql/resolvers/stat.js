/* 
  Resolvers for stat.

  db is a mysql2 database instance. 

  The 'stat' table has columns:
    'stat_id'
    'stat_name'
    'stat_formatted_name'
    'introduced'
*/

// Import helpers
//#region

const {
  basicEdge,
  modifyStatEdge,
  parentPK,

  basicJunctionConnection,
} = require('./helpers.js');
const statPK = parentPK('stat');

//#endregion

// Query
/*
    statByID(id)
    statByName(name)
    stats(
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
  statByName: async (parent, { name }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM stat
        WHERE stat_name = '${name.toLowerCase()}'
      `
    )
    .then( ([results, fields]) => {
      return results[0];
    })
    .catch(console.log);
  },

  // TODO: cursor
  stats: async (parent, { generation }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM stat
      `
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);
  },
}

//#endregion

// Stat
/*
    id
    abilityModifies
    itemModifies
    moveModifies
*/
//#region

const Stat = {
  abilityModifies: statPK,
  
  formattedName: async (parent, args, context, info) => {
    return parent.stat_formatted_name;
  },
  
  itemModifies: statPK,
  
  name: async (parent, args, context, info) => {
    return parent.stat_name
  },
  
  moveModifies: statPK,
}

//#endregion

// Connections and edges
/*

*/
//#region

const ConnectionsAndEdges = {
  StatModifiedByAbilityConnection: basicJunctionConnection('stat', 'ability', 'modifiedBy'),
  StatModifiedByAbilityEdge: modifyStatEdge(),

  StatModifiedByItemConnection: basicJunctionConnection('stat', 'item', 'modifiedBy'),
  StatModifiedByItemEdge: modifyStatEdge(),

  StatModifiedByMoveConnection: basicJunctionConnection('stat', 'move', 'modifiedBy'),
  StatModifiedByMoveEdge: modifyStatEdge(),
}

//#endregion

module.exports = {
  Query,
  Stat,
  ...ConnectionsAndEdges,
}