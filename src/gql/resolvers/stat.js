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
  queryEntities,
  queryEntitiesByColumn,

  basicEdge,
  modifyStatEdge,
  parentPK,

  junctionConnection,
  generationConnection,
  introductionConnection,
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
  statByName: queryEntitiesByColumn('stat', 'name'),

  stats: queryEntities('stat'),
}

//#endregion

// Stat
/*
    id
*/
//#region

const Stat = {
  modifiedByAbility: statPK,
  
  formattedName: async (parent, args, context, info) => {
    return parent.stat_formatted_name;
  },

  generation: parent => parent.generation_id,
  
  introduced: parent => parent.introduced,
  
  modifiedByItem: statPK,
  
  name: async (parent, args, context, info) => {
    return parent.stat_name
  },
  
  modifiedByMove: statPK,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  StatGenerationConnection: generationConnection('stat'),
  StatGenerationEdge: basicEdge(),

  StatIntroductionConnection: introductionConnection('stat'),
  StatIntroductionEdge: basicEdge(),

  StatModifiedByAbilityConnection: junctionConnection('stat', 'ability', 'modifiedBy'),
  StatModifiedByAbilityEdge: modifyStatEdge(),

  StatModifiedByItemConnection: junctionConnection('stat', 'item', 'modifiedBy'),
  StatModifiedByItemEdge: modifyStatEdge(),

  StatModifiedByMoveConnection: junctionConnection('stat', 'move', 'modifiedBy'),
  StatModifiedByMoveEdge: modifyStatEdge(),
}

//#endregion

module.exports = {
  Query,
  Stat,
  ...ConnectionsAndEdges,
}