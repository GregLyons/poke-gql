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

  parentPK,

  basicEdge,
  multiplierEdge,
  powerEdge,

  junctionConnection,
  generationConnection,
  introductionConnection,
} = require('./helpers.js');
const typePK = parentPK('type');

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

  // TODO: cursor
  types: queryEntities('type'),
}

//#endregion

// Type
/*
    id
    enables
    doubleDamageFrom
    neutralDamageFrom
    halfDamageFrom
    noDamageFrom
    doubleDamageTo
    neutralDamageTo
    halfDamageTo
    noDamageTo
*/
//#region

const Type = {
  boostedByAbility: typePK,
  
  boostedByFieldState: typePK,

  boostedByItem: typePK,
  
  defensiveMatchups: typePK,
  
  enablesMove: typePK,
  
  formattedName: parent => parent.ptype_formatted_name,
  
  generation: parent => parent.generation_id,

  ignoresFieldState: typePK,
  
  introduced: parent => parent.introduced,
  
  moves: typePK,
  
  name: parent => parent.ptype_name,
  
  naturalGift: typePK,
  
  offensiveMatchups: typePK,
  
  pokemon: typePK,

  removesFieldState: typePK,

  resistedByAbility: typePK,

  resistedByFieldState: typePK,
  
  resistedByItem: typePK,

  resistsFieldState: typePK,

  weatherBall: typePK,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  DefensiveTypeMatchupConnection: junctionConnection('type', 'defensiveMatchup'),
  DefensiveTypeMatchupEdge: multiplierEdge(),

  OffensiveTypeMatchupConnection: junctionConnection('type', 'offensiveMatchup'),
  OffensiveTypeMatchupEdge: multiplierEdge(),

  TypeBoostedByAbilityConnection: junctionConnection('type', 'ability', 'boostedBy'),
  TypeBoostedByAbilityEdge: multiplierEdge(),

  TypeBoostedByFieldStateConnection: junctionConnection('type', 'fieldState', 'boostedBy'),
  TypeBoostedByFieldStateEdge: multiplierEdge(),

  TypeBoostedByItemConnection: junctionConnection('type', 'item', 'boostedBy'),
  TypeBoostedByItemEdge: multiplierEdge(),

  TypeEnablesMoveConnection: junctionConnection('type', 'move', 'enables'),
  TypeEnablesMoveEdge: basicEdge(),

  TypeGenerationConnection: generationConnection('type'),
  TypeGenerationEdge: basicEdge(),

  TypeIgnoresFieldStateConnection: junctionConnection('type', 'fieldState', 'ignores'),
  TypeIgnoresFieldStateEdge: basicEdge(),
  
  TypeIntroductionConnection: introductionConnection('type'),
  TypeIntroductionEdge: basicEdge(),
  
  TypeMoveConnection: junctionConnection('type', 'move'),
  TypeMoveEdge: basicEdge(),
  
  TypeNaturalGiftConnection: junctionConnection('type', 'naturalGift'),
  TypeNaturalGiftEdge: powerEdge(),

  TypePokemonConnection: junctionConnection('type', 'pokemon'),
  TypePokemonEdge: basicEdge(),
  
  TypeRemovesFieldStateConnection: junctionConnection('type', 'fieldState', 'removes'),
  TypeRemovesFieldStateEdge: basicEdge(),

  TypeResistedByAbilityConnection: junctionConnection('type', 'ability', 'resistedBy'),
  TypeResistedByAbilityEdge: multiplierEdge(),

  TypeResistedByFieldStateConnection: junctionConnection('type', 'fieldState', 'resistedBy'),
  TypeResistedByFieldStateEdge: multiplierEdge(),
  
  TypeResistedByItemConnection: junctionConnection('type', 'item', 'resistedBy'),
  TypeResistedByItemEdge: multiplierEdge(),
  
  TypeResistsFieldStateConnection: junctionConnection('type', 'fieldState', 'resists'),
  TypeResistsFieldStateEdge: multiplierEdge(),

  TypeWeatherBallConnection: junctionConnection('type', 'weatherBall'),
  TypeWeatherBallEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Type,
  ...ConnectionsAndEdges,
}