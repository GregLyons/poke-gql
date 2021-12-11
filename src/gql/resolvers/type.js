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
  parentPK,

  basicEdge,
  multiplierEdge,
  powerEdge,

  basicJunctionConnection,
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
  typeByName: async (parent, { generation, name }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM ptype
        WHERE generation_id = ${generation}
        AND ptype_name = '${name.toLowerCase()}'
      `
    )
    .then( ([results, fields]) => {
      return results[0];
    })
    .catch(console.log);
  },

  // TODO: cursor
  types: async (parent, { generation }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM ptype
        WHERE generation_id = ${generation}
      `
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);
  },
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
  abilityBoosts: typePK,

  abilityResists: typePK,

  defensiveMatchups: typePK,
  
  enablesMove: typePK,
  
  formattedName: parent => parent.ptype_formatted_name,
  
  introduced: parent => parent.introduced,

  itemBoosts: typePK,

  itemResists: typePK,

  moves: typePK,
  
  name: parent => parent.ptype_name,
  
  offensiveMatchups: typePK,

  naturalGift: typePK,

  pokemon: typePK,
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

  TypeBoostedByItemConnection: basicJunctionConnection('type', 'item', 'boostedBy'),
  TypeBoostedByItemEdge: multiplierEdge(),

  TypeEnablesMoveConnection: basicJunctionConnection('type', 'move', 'enables'),
  TypeEnablesMoveEdge: basicEdge(),

  TypeGenerationConnection: introductionConnection('type'),
  TypeGenerationEdge: basicEdge(),

  TypeMoveConnection: basicJunctionConnection('type', 'move'),
  TypeMoveEdge: basicEdge(),

  TypeNaturalGiftConnection: basicJunctionConnection('type', 'naturalGift'),
  TypeNaturalGiftEdge: powerEdge(),

  TypePokemonConnection: basicJunctionConnection('type', 'pokemon'),
  TypePokemonEdge: basicEdge(),
  
  TypeResistedByAbilityConnection: basicJunctionConnection('type', 'ability', 'resistedBy'),
  TypeResistedByAbilityEdge: multiplierEdge(),

  TypeResistedByItemConnection: basicJunctionConnection('type', 'item', 'resistedBy'),
  TypeResistedByItemEdge: multiplierEdge(),
}

//#endregion

module.exports = {
  Query,
  Type,
  ...ConnectionsAndEdges,
}