const {
  getGenLoader,
  getLoaderAndCounter,
} = require('./helpers.js');

class Pokemon {
    
  loaders = {};

  load(key, id, pagination, filter, countMode) {
    const loader = this.findLoader(key, pagination, filter, countMode);
    return loader.load(id);
  }

  clearLoaders() {
    this.loaders = {};
  }

  findLoader(key, pagination, filter, countMode) {
    if (!this.loaders[key]) {
      if (['generation', 'introduced'].includes(key)) {
        this.loaders[key] = this[key](pagination, filter);
      }
      else {
        this.loaders[key] = getLoaderAndCounter(this[key](pagination, filter));
      }
    }
    return countMode 
      ? this.loaders[key].counter
      : this.loaders[key].loader;
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

  generation(pagination, filter) {
    return getGenLoader(pagination, filter);
  }

  introduced(pagination, filter) {
    return getGenLoader(pagination, filter);
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

module.exports = new Pokemon();