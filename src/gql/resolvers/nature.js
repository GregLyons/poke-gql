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
  queryEntities,
  queryEntitiesByColumn,

  parentPK,
  
  basicEdge,
  modifyStatEdge,

  junctionConnection,
  generationConnection,
  introductionConnection,
} = require('./helpers.js');
const naturePK = parentPK('effect');

//#endregion

// Query
/*
    natureByName(name)
    natures(
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
  natureByName: queryEntitiesByColumn('nature', 'name'),

  natures: queryEntities('nature'),
}

//#endregion

// Nature
/*
    id
*/
//#region

const Nature = {
  confusedByItem: naturePK,

  dislikedFlavor: parent => parent.nature_disliked_flavor,

  formattedName: parent => parent.nature_formatted_name,

  generation: parent => parent.generation_id,
  
  introduced: parent => parent.introduced,
  
  likedFlavor: parent => parent.nature_favorite_flavor,

  modifiesStat: naturePK,

  name: parent => parent.nature_name,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  NatureConfusedByItemConnection: junctionConnection('nature', 'confusedByItem'),
  NatureConfusedByItemEdge: basicEdge(),
  
  NatureGenerationConnection: generationConnection('nature'),
  NatureGenerationEdge: basicEdge(),
  
  NatureIntroductionConnection: introductionConnection('nature'),
  NatureIntroductionEdge: basicEdge(),

  NatureModifiesStatConnection: junctionConnection('nature', 'modifiesStat'),
  NatureModifiesStatEdge: modifyStatEdge(),
}

//#endregion

module.exports = {
  Query,
  Nature,
  ...ConnectionsAndEdges,
}