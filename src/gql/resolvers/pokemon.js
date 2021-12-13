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
  queryEntities,
  queryEntityByColumn,

  abilityEdge,
  basicEdge,
  evolutionEdge,
  formEdge,
  learnsetEdge,

  basicJunctionConnection,
  generationConnection,
  introductionConnection,
  
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
  pokemonByName: queryEntityByColumn('pokemon', 'name'),

  // TODO: cursor
  pokemon: queryEntities('pokemon'),
}

//#endregion

// Pokemon
/*
    id
    enables
    requires
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

  enablesItem: pokemonPK,

  enablesMove: pokemonPK,

  evolvesFrom: pokemonPK,

  evolvesTo: pokemonPK,

  formattedName: parent => parent.pokemon_formatted_name,

  formClass: parent => parent.pokemon_form_class.toUpperCase(),

  forms: pokemonPK,

  generation: parent => parent.generation_id,
  
  height: parent => parent.pokemon_height,

  introduced: parent => parent.introduced,

  moves: pokemonPK,
  
  name: parent => parent.pokemon_name,

  requiresItem: pokemonPK,

  speciesName: parent => parent.pokemon_species,

  typing: pokemonPK,

  weight: parent => parent.pokemon_weight,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  PokemonAbilityConnection: basicJunctionConnection('pokemon', 'ability'),
  PokemonAbilityEdge: abilityEdge(),
  
  PokemonEnablesItemConnection: basicJunctionConnection('pokemon', 'item', 'enables'),
  PokemonEnablesItemEdge: basicEdge(),

  PokemonEnablesMoveConnection: basicJunctionConnection('pokemon', 'move', 'enables'),
  PokemonEnablesMoveEdge: basicEdge(),

  PokemonEvolutionConnection: basicJunctionConnection('pokemon', 'evolvesTo'),
  PokemonEvolutionEdge: evolutionEdge(),

  PokemonFormConnection: basicJunctionConnection('pokemon', 'form'),
  PokemonFormEdge: formEdge(),
  
  PokemonGenerationConnection: generationConnection('pokemon'),
  PokemonGenerationEdge: basicEdge(),

  PokemonIntroductionConnection: introductionConnection('pokemon'),
  PokemonIntroductionEdge: basicEdge(),
  
  PokemonMoveConnection: basicJunctionConnection('pokemon', 'move'),
  PokemonMoveEdge: learnsetEdge(),
  
  PokemonPrevolutionConnection: basicJunctionConnection('pokemon', 'evolvesFrom'),
  PokemonPrevolutionEdge: evolutionEdge(),

  PokemonRequiresItemConnection: basicJunctionConnection('pokemon', 'item', 'requires'),
  PokemonRequiresItemEdge: basicEdge(),
  
  PokemonTypeConnection: basicJunctionConnection('pokemon', 'type'),
  PokemonTypeEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Pokemon,
  ...ConnectionsAndEdges,
}