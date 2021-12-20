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
  formattedName: async (parent, args, context, info) => {
    return parent.stat_formatted_name;
  },
  
  generation: parent => parent.generation_id,
  
  introduced: parent => parent.introduced,
  
  modifiedByAbility: statPK,
  
  modifiedByFieldState: statPK,

  modifiedByItem: statPK,
  
  modifiedByMove: statPK,
  
  name: async (parent, args, context, info) => {
    return parent.stat_name
  },
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  StatGenerationConnection: generationConnection('stat'),
  StatGenerationEdge: basicEdge(),

  StatIntroductionConnection: introductionConnection('stat'),
  StatIntroductionEdge: basicEdge(),

  StatModifiedByAbilityConnection: junctionConnection('stat', 'modifiedByAbility'),
  StatModifiedByAbilityEdge: modifyStatEdge(),

  StatModifiedByFieldStateConnection: junctionConnection('stat', 'modifiedByFieldState'),
  StatModifiedByFieldStateEdge: modifyStatEdge(),

  StatModifiedByItemConnection: junctionConnection('stat', 'modifiedByItem'),
  StatModifiedByItemEdge: modifyStatEdge(),

  StatModifiedByMoveConnection: junctionConnection('stat', 'modifiedByMove'),
  StatModifiedByMoveEdge: modifyStatEdge(),
}

//#endregion

module.exports = {
  Query,
  Stat,
  ...ConnectionsAndEdges,
}