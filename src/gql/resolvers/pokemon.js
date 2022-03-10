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
  topLevelConnection,
  
  parentPK,
  parentPKDebut,
  primaryKeyToID,
  topLevelBulkQuery,
} = require('./helpers.js');
const pokemonPK = parentPK('pokemon')
const pokemonPKDebut = parentPKDebut('pokemon');
const getID = primaryKeyToID('pokemon');

//#endregion

// Query
//#region

const Query = {
  pokemonByName: queryEntitiesByColumn('pokemon', 'name'),

  pokemonByNames: queryEntitiesByColumn('pokemon', 'names'),

  pokemonByPSID: queryEntitiesByColumn('pokemon', 'psID'),

  pokemonByPSIDs: queryEntitiesByColumn('pokemon', 'psIDs'),

  pokemon: topLevelBulkQuery('pokemon'),
}

//#endregion

// Pokemon
//#region

const Pokemon = {
  id: getID,

  abilities: pokemonPK,

  baseStats: parent => {
    return {
      id: parent.generation_id + parent.ps_id,
      hp: parent.pokemon_hp,
      attack: parent.pokemon_attack,
      defense: parent.pokemon_defense,
      specialAttack: parent.pokemon_special_attack,
      specialDefense: parent.pokemon_special_defense,
      speed: parent.pokemon_speed,
      baseStatTotal: parent.pokemon_base_stat_total,
    };
  },

  dexNumber: parent => parent.pokemon_dex,

  enablesItem: pokemonPK,

  enablesMove: pokemonPK,

  evolvesFrom: pokemonPK,

  evolvesTo: pokemonPK,

  femaleRate: parent => parent.pokemon_female_rate,

  formattedName: parent => parent.pokemon_formatted_name,

  formattedPSID: parent => parent.pokemon_formatted_ps_id,

  formClass: parent => parent.pokemon_form_class.toUpperCase(),

  forms: pokemonPK,

  genderless: parent => parent.pokemon_genderless,

  generation: pokemonPK,
  
  height: parent => parent.pokemon_height,

  introduced: pokemonPKDebut,

  maleRate: parent => parent.pokemon_male_rate,

  moves: pokemonPK,
  
  name: parent => parent.pokemon_name,

  pokeapiID: parent => parent.pokemon_pokeapi_id,

  pokeapiName: parent => parent.pokemon_pokeapi_name,

  psID: parent => parent.pokemon_ps_id,

  removedFromSwSh: parent => parent.pokemon_removed_from_swsh,

  removedFromBDSP: parent => parent.pokemon_removed_from_bdsp,

  requiresItem: pokemonPK,

  speciesName: parent => parent.pokemon_species,

  typeNames: parent => parent.pokemon_ptype_name_2 
    ? [parent.pokemon_ptype_name_1.toUpperCase(), parent.pokemon_ptype_name_2.toUpperCase()]
    : [parent.pokemon_ptype_name_1.toUpperCase()],

  typing: pokemonPK,

  weight: parent => parent.pokemon_weight,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  PokemonConnection: topLevelConnection('pokemon'),
  PokemonEdge: basicEdge(),

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