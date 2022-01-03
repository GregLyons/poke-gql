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
  
  junctionConnection,
  generationConnection,
  introductionConnection,
  
  parentPK,
  primaryKeyToID,
} = require('./helpers.js');
const statPK = parentPK('stat');
const getID = primaryKeyToID('stat');

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

  statsByName: queryEntitiesByColumn('stat', 'names'),

  stats: queryEntities('stat'),
}

//#endregion

// Stat
//#region

const Stat = {
  id: getID,

  formattedName: async (parent, args, context, info) => {
    return parent.stat_formatted_name;
  },
  
  generation: parent => parent.generation_id,
  
  introduced: parent => parent.introduced,
  
  modifiedByAbility: statPK,
  
  modifiedByFieldState: statPK,

  modifiedByItem: statPK,
  
  modifiedByMove: statPK,

  modifiedByNature: statPK,
  
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

  StatModifiedByNatureConnection: junctionConnection('stat', 'modifiedByNature'),
  StatModifiedByNatureEdge: modifyStatEdge(),
}

//#endregion

module.exports = {
  Query,
  Stat,
  ...ConnectionsAndEdges,
}