const {
  LoadersForEntity,
} = require('./helpers.js');

class PokemonLoaders extends LoadersForEntity {
  
  constructor() {
    super();
  }

  ability(pagination, filter) {
    return [pagination, filter, 'pokemon', 'ability', 'pokemon_ability', false];;
    
    return getLoaderAndCounter(databaseInfo);
  }
  
  enablesItem(pagination, filter) {
    return [pagination, filter, 'item', 'pokemon', 'item_requires_pokemon', true];
  }

  enablesMove(pagination, filter) {
    return [pagination, filter, 'move', 'pokemon', 'pmove_requires_pokemon', true];
  }

  evolvesFrom(pagination, filter) {
    return [pagination, filter, 'pokemon', 'pokemon', 'pokemon_evolution', true];
  }

  evolvesTo(pagination, filter) {
    return [pagination, filter, 'pokemon', 'pokemon', 'pokemon_evolution', false];
  }

  form(pagination, filter) {
    return [pagination, filter, 'pokemon', 'pokemon', 'pokemon_form', false];
  }
  
  move(pagination, filter) {
    return [pagination, filter, 'pokemon', 'move', 'pokemon_pmove', false];
  }

  requiresItem(pagination, filter) {
    return [pagination, filter, 'pokemon', 'item', 'pokemon_requires_item', false];
  }

  type(pagination, filter) {
    return [pagination, filter, 'pokemon', 'type', 'pokemon_ptype', false];
  }
}

module.exports = new PokemonLoaders();