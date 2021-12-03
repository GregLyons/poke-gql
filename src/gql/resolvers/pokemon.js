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
  abilityEdge,
  basicEdge,
  learnsetEdge,

  introductionConnection,
  basicJunctionConnection,
  parentPK,
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
    abilities
    enables
    enablesItem
    enablesMove
    evolvesTo
    evolvesFrom
    formData
    moves
    requires
    requiresItem // TODO: put in db
    quadDamageFrom
    doubleDamageFrom
    neutralDamageFrom
    halfDamageFrom
    quarterDamageFrom
    noDamageFrom
*/
//#region

const Pokemon = {
  abilities: pokemonPK,

  baseStats: parent => {
    return {
      hp: parent.pokemon_hp,
      attack: parent.pokemon_attack,
      defense: parent.pokemon_defense,
      specialAttack: parent.pokemon_special_attack,
      specialDefense: parent.pokemon_special_defense,
      speed: parent.pokemon_speed,
    };
  },

  dexNumber: parent => parent.pokemon_dex,

  formattedName: parent => parent.pokemon_formattedName,
  
  height: parent => parent.pokemon_height,

  introduced: parent => parent.introduced,

  moves: pokemonPK,
  
  name: parent => parent.pokemon_name,

  speciesName: parent => parent.pokemon_species,

  typing: pokemonPK,

  weight: parent => parent.pokemon_weight,
}

//#endregion

// Connections and edges
/*

*/
//#region

const ConnectionsAndEdges = {
  PokemonAbilityConnection: basicJunctionConnection('pokemon', 'ability'),
  PokemonAbilityEdge: abilityEdge(),

  PokemonGenerationConnection: introductionConnection('pokemon'),
  PokemonGenerationEdge: basicEdge(),

  PokemonMoveConnection: basicJunctionConnection('pokemon', 'move'),
  PokemonMoveEdge: learnsetEdge(),

  PokemonTypeConnection: basicJunctionConnection('pokemon', 'type'),
  PokemonTypeEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Pokemon,
  ...ConnectionsAndEdges,
}