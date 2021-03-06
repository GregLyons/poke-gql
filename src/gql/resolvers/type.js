/* 
  Resolvers for Type.

  db is a mysql2 database instance. 

  The 'type' table has columns:
    'generation_id'
    'type_id'
    'type_name'
    'type_formatted_name'
    'introduced'
*/

// Import helpers
//#region

const {
  queryEntities,
  queryEntitiesByColumn,
  
  basicEdge,
  multiplierEdge,
  powerEdge,
  
  junctionConnection,
  generationConnection,
  introductionConnection,
  topLevelConnection,

  parentPK,
  parentPKDebut,
  primaryKeyToID,
  topLevelBulkQuery,
} = require('./helpers.js');
const typePK = parentPK('type')
const typePKDebut = parentPKDebut('type');
const getID = primaryKeyToID('type');

//#endregion

// Query
/*
    typeByID(id)
    typeByName(name)
    types(
      cursor,
      limit,
      generation,
      contains,
      endsWith,
      introducedAfter,
      introducedBefore,
      startsWith
    )
*/
//#region

const Query = {
  typeByName: queryEntitiesByColumn('type', 'name'),

  typesByName: queryEntitiesByColumn('type', 'names'),

  // TODO: cursor
  types: topLevelBulkQuery('type'),
}

//#endregion

// Type
//#region

const Type = {
  id: getID,

  boostedByAbility: typePK,
  
  boostedByFieldState: typePK,

  boostedByItem: typePK,
  
  defensiveMatchups: typePK,
  
  enablesMove: typePK,
  
  formattedName: parent => parent.ptype_formatted_name,
  
  generation: typePK,

  ignoresFieldState: typePK,
  
  introduced: typePKDebut,
  
  moves: typePK,
  
  name: parent => parent.ptype_name,
  
  naturalGift: typePK,
  
  offensiveMatchups: typePK,
  
  pokemon: typePK,

  removesFieldState: typePK,

  resistedByAbility: typePK,
  
  resistedByItem: typePK,
  
  resistsFieldState: typePK,

  weakenedByFieldState: typePK,

  weatherBall: typePK,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  TypeConnection: topLevelConnection('type'),
  TypeEdge: basicEdge(),

  DefensiveTypeMatchupConnection: junctionConnection('type', 'defensiveMatchup'),
  DefensiveTypeMatchupEdge: multiplierEdge(),

  OffensiveTypeMatchupConnection: junctionConnection('type', 'offensiveMatchup'),
  OffensiveTypeMatchupEdge: multiplierEdge(),

  TypeBoostedByAbilityConnection: junctionConnection('type', 'boostedByAbility'),
  TypeBoostedByAbilityEdge: multiplierEdge(),

  TypeBoostedByFieldStateConnection: junctionConnection('type', 'boostedByFieldState'),
  TypeBoostedByFieldStateEdge: multiplierEdge(),

  TypeBoostedByItemConnection: junctionConnection('type', 'boostedByItem'),
  TypeBoostedByItemEdge: multiplierEdge(),

  TypeEnablesMoveConnection: junctionConnection('type', 'enablesMove'),
  TypeEnablesMoveEdge: basicEdge(),

  TypeGenerationConnection: generationConnection('type'),
  TypeGenerationEdge: basicEdge(),

  TypeIgnoresFieldStateConnection: junctionConnection('type', 'ignoresFieldState'),
  TypeIgnoresFieldStateEdge: basicEdge(),
  
  TypeIntroductionConnection: introductionConnection('type'),
  TypeIntroductionEdge: basicEdge(),
  
  TypeMoveConnection: junctionConnection('type', 'move'),
  TypeMoveEdge: basicEdge(),
  
  TypeNaturalGiftConnection: junctionConnection('type', 'naturalGift'),
  TypeNaturalGiftEdge: powerEdge(),

  TypePokemonConnection: junctionConnection('type', 'pokemon'),
  TypePokemonEdge: basicEdge(),
  
  TypeRemovesFieldStateConnection: junctionConnection('type', 'removesFieldState'),
  TypeRemovesFieldStateEdge: basicEdge(),

  TypeResistedByAbilityConnection: junctionConnection('type', 'resistedByAbility'),
  TypeResistedByAbilityEdge: multiplierEdge(),
  
  TypeResistedByItemConnection: junctionConnection('type', 'resistedByItem'),
  TypeResistedByItemEdge: multiplierEdge(),
  
  TypeResistsFieldStateConnection: junctionConnection('type', 'resistsFieldState'),
  TypeResistsFieldStateEdge: multiplierEdge(),

  TypeWeakenedByFieldStateConnection: junctionConnection('type', 'weakenedByFieldState'),
  TypeWeakenedByFieldStateEdge: multiplierEdge(),
  
  TypeWeatherBallConnection: junctionConnection('type', 'weatherBall'),
  TypeWeatherBallEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Type,
  ...ConnectionsAndEdges,
}