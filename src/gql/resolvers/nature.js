/* 
  Resolvers for Effect.

  db is a mysql2 database instance. 

  The 'nature' table has columns:
    'nature_generation_id'
    'nature_id'
    'nature_name'
    'nature_formatted_name'
    'introduced'
    'nature_favorite_flavor'
    'nature_disliked_flavor'
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
  parentPKDebut,
  primaryKeyToID,
} = require('./helpers.js');
const naturePK = parentPK('nature')
const naturePKDebut = parentPKDebut('nature');
const getID = primaryKeyToID('nature');

//#endregion

// Query
//#region

const Query = {
  natureByName: queryEntitiesByColumn('nature', 'name'),

  naturesByName: queryEntitiesByColumn('nature', 'names'),

  natures: queryEntities('nature'),
}

//#endregion

// Nature
//#region

const Nature = {
  id: getID,

  confusedByItem: naturePK,

  dislikedFlavor: parent => parent.nature_disliked_flavor,

  dislikedFlavorName: parent => parent.nature_disliked_flavor,

  formattedName: parent => parent.nature_formatted_name,

  generation: naturePK,
  
  introduced: naturePKDebut,
  
  likedFlavor: parent => parent.nature_favorite_flavor,

  likedFlavorName: parent => parent.nature_favorite_flavor,

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