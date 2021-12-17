const DataLoader = require('dataloader');
const {
  batchGens,
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');

class Item {
    
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

  activatedByFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'item', 'activates', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  boostsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'type', 'boosts', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  boostsUsageMethod(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'usageMethod', 'boosts', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  causesStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'status', 'causes', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  description(pagination, filter) {
    const databaseInfo = [pagination, filter, 'description', 'item', '', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  effect(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'effect', '', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  enablesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'item', 'requires', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  enablesPokemon(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'item', 'requires', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  extendsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'extends', false];

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

  ignoresFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'ignores', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  introduced(pagination, filter) {
    return {
      loader: new DataLoader(batchGens(pagination, filter))
    }
  }

  modifiesStat(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'stat', 'modifies', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  // TODO
  naturalGift(pagination, filter) {
    return new DataLoader(junctionBatcher(pagination, filter, 'item', 'type', 'natural_gift'))
  }

  resistsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'resists', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistsStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'status', 'resists', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'type', 'resists', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistsUsageMethod(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'usageMethod', 'resists', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
}

module.exports = new Item();