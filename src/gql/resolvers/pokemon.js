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
  queryEntitiesByColumn,

  abilityEdge,
  basicEdge,
  evolutionEdge,
  formEdge,
  learnsetEdge,

  junctionConnection,
  generationConnection,
  introductionConnection,
  
  parentPK,
  parentPKDebut,
  primaryKeyToID,
} = require('./helpers.js');
const pokemonPK = parentPK('pokemon')
const pokemonPKDebut = parentPKDebut('pokemon');
const getID = primaryKeyToID('pokemon');

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
  pokemonByName: queryEntitiesByColumn('pokemon', 'name'),

  // TODO: cursor
  pokemon: queryEntities('pokemon'),
}

//#endregion

// Pokemon
//#region

const Pokemon = {
  id: getID,

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

  generation: pokemonPK,
  
  height: parent => parent.pokemon_height,

  introduced: pokemonPKDebut,

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
  PokemonAbilityConnection: junctionConnection('pokemon', 'ability'),
  PokemonAbilityEdge: abilityEdge(),
  
  PokemonEnablesItemConnection: junctionConnection('pokemon', 'enablesItem'),
  PokemonEnablesItemEdge: basicEdge(),

  PokemonEnablesMoveConnection: junctionConnection('pokemon', 'enablesMove'),
  PokemonEnablesMoveEdge: basicEdge(),

  PokemonEvolutionConnection: junctionConnection('pokemon', 'evolvesTo'),
  PokemonEvolutionEdge: evolutionEdge(),

  PokemonFormConnection: junctionConnection('pokemon', 'form'),
  PokemonFormEdge: formEdge(),
  
  PokemonGenerationConnection: generationConnection('pokemon'),
  PokemonGenerationEdge: basicEdge(),

  PokemonIntroductionConnection: introductionConnection('pokemon'),
  PokemonIntroductionEdge: basicEdge(),
  
  PokemonMoveConnection: junctionConnection('pokemon', 'move'),
  PokemonMoveEdge: learnsetEdge(),
  
  PokemonPrevolutionConnection: junctionConnection('pokemon', 'evolvesFrom'),
  PokemonPrevolutionEdge: evolutionEdge(),

  PokemonRequiresItemConnection: junctionConnection('pokemon', 'requiresItem'),
  PokemonRequiresItemEdge: basicEdge(),
  
  PokemonTypeConnection: junctionConnection('pokemon', 'type'),
  PokemonTypeEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Pokemon,
  ...ConnectionsAndEdges,
}