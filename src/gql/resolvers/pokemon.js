/* 
  Resolvers for Pokemon.

  db is a mysql2 database instance. 

  The 'pokemon' table has columns:
    'generation_id'
    'pokemon_id'
    'pokemon_name'
    'pokemon_formatted_name'
    'introduced'
*/

// Import helpers
//#region

const {
  basicEdge,
  introductionConnection,
  basicJunctionConnection,
  parentPK,
  typeConnection,
} = require('./helpers.js');
const pokemonPK = parentPK('pokemon');

//#endregion

// Query
/*
    pokemonByID(id)
    pokemonByName(name)
    pokemons(
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
  pokemonByName: async (parent, { generation, name }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM pokemon
        WHERE generation_id = ${generation}
        AND pokemon_name = '${name.toLowerCase()}'
      `
    )
    .then( ([results, fields]) => {
      return results[0];
    })
    .catch(console.log);
  },

  // TODO: cursor
  pokemon: async (parent, { generation }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM pokemon
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

// Pokemon
/*
    id
    boostsType(input)
    boostsUsageMethod(input)
    causesStatus(input)
    descriptions(input)
    effect(input)
    formattedName
    introduced(input)
    modifiesStat(input)
    name
    resistsType(input)
    resistsUsageMethod(input)
    resistsStatus(input)
*/
//#region

const Pokemon = {
  formattedName: async (parent, args, context, info) => {
    return parent.pokemon_formatted_name;
  },
  
  introduced: async (parent, args, context, info) => {
    return parent.introduced;
  },
  
  name: async (parent, args, context, info) => {
    return parent.pokemon_name
  },

  typing: pokemonPK,
}

//#endregion

// Connections and edges
/*

*/
//#region

const ConnectionsAndEdges = {
  PokemonGenerationConnection: introductionConnection('pokemon'),
  PokemonGenerationEdge: basicEdge(),

  PokemonTypeConnection: basicJunctionConnection('pokemon', 'type'),
  PokemonTypeEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Pokemon,
  ...ConnectionsAndEdges,
}