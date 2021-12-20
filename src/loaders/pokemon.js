const DataLoader = require('dataloader');
const {
  batchGens,
  junctionBatcher,
  junctionBatcherCount,
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
      this.loaders[key] = this[key](pagination, filter);
    }
    return countMode 
      ? this.loaders[key].counter
      : this.loaders[key].loader;
  }

  ability(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'ability', 'pokemon_ability', false];
    
    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  enablesItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'pokemon', 'item_requires_pokemon', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  enablesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'pokemon', 'pmove_requires_pokemon', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  evolvesFrom(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'pokemon', 'pokemon_evolution', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  evolvesTo(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'pokemon', 'pokemon_evolution', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  form(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'pokemon', 'pokemon_form', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  generation(pagination, filter) {
    return {
      loader: new DataLoader(batchGens(pagination, filter))
    }
  }

  introduced(pagination, filter) {
    return {
      loader: new DataLoader(batchGens(pagination, filter))
    }
  }

  move(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'move', 'pokemon_pmove', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  requiresItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'item', 'pokemon_requires_item', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  type(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'type', 'pokemon_ptype', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
}

module.exports = new Pokemon();