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
  topLevelConnection,
  
  parentPK,
  parentPKDebut,
  primaryKeyToID,
  topLevelBulkQuery,
} = require('./helpers.js');
const statPK = parentPK('stat')
const statPKDebut = parentPKDebut('stat');
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

  stats: topLevelBulkQuery('stat'),
}

//#endregion

// Stat
//#region

const Stat = {
  id: getID,

  description: parent => parent.stat_description,

  formattedName: parent => parent.stat_formatted_name,
  
  generation: statPK,
  
  introduced: statPKDebut,
  
  modifiedByAbility: statPK,
  
  modifiedByFieldState: statPK,

  modifiedByItem: statPK,
  
  modifiedByMove: statPK,

  modifiedByNature: statPK,
  
  name: parent => parent.stat_name,

  unformattedName: parent => parent.stat_unformatted_name,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  StatConnection: topLevelConnection('stat'),
  StatEdge: basicEdge(),

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