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

  basicJunctionConnection,
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
  DefensiveTypeMatchupConnection: basicJunctionConnection('type', 'defensiveMatchup'),
  DefensiveTypeMatchupEdge: multiplierEdge(),

  OffensiveTypeMatchupConnection: basicJunctionConnection('type', 'offensiveMatchup'),
  OffensiveTypeMatchupEdge: multiplierEdge(),

  TypeBoostedByAbilityConnection: basicJunctionConnection('type', 'ability', 'boostedBy'),
  TypeBoostedByAbilityEdge: multiplierEdge(),

  TypeBoostedByFieldStateConnection: basicJunctionConnection('type', 'fieldState', 'boostedBy'),
  TypeBoostedByFieldStateEdge: multiplierEdge(),

  TypeBoostedByItemConnection: basicJunctionConnection('type', 'item', 'boostedBy'),
  TypeBoostedByItemEdge: multiplierEdge(),

  TypeEnablesMoveConnection: basicJunctionConnection('type', 'move', 'enables'),
  TypeEnablesMoveEdge: basicEdge(),

  TypeGenerationConnection: generationConnection('type'),
  TypeGenerationEdge: basicEdge(),

  TypeIgnoresFieldStateConnection: basicJunctionConnection('type', 'fieldState', 'ignores'),
  TypeIgnoresFieldStateEdge: basicEdge(),
  
  TypeIntroductionConnection: introductionConnection('type'),
  TypeIntroductionEdge: basicEdge(),
  
  TypeMoveConnection: basicJunctionConnection('type', 'move'),
  TypeMoveEdge: basicEdge(),
  
  TypeNaturalGiftConnection: basicJunctionConnection('type', 'naturalGift'),
  TypeNaturalGiftEdge: powerEdge(),

  TypePokemonConnection: basicJunctionConnection('type', 'pokemon'),
  TypePokemonEdge: basicEdge(),
  
  TypeRemovesFieldStateConnection: basicJunctionConnection('type', 'fieldState', 'removes'),
  TypeRemovesFieldStateEdge: basicEdge(),

  TypeResistedByAbilityConnection: basicJunctionConnection('type', 'ability', 'resistedBy'),
  TypeResistedByAbilityEdge: multiplierEdge(),

  TypeResistedByFieldStateConnection: basicJunctionConnection('type', 'fieldState', 'resistedBy'),
  TypeResistedByFieldStateEdge: multiplierEdge(),
  
  TypeResistedByItemConnection: basicJunctionConnection('type', 'item', 'resistedBy'),
  TypeResistedByItemEdge: multiplierEdge(),
  
  TypeResistsFieldStateConnection: basicJunctionConnection('type', 'fieldState', 'resists'),
  TypeResistsFieldStateEdge: multiplierEdge(),

  TypeWeatherBallConnection: basicJunctionConnection('type', 'weatherBall'),
  TypeWeatherBallEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Type,
  ...ConnectionsAndEdges,
}