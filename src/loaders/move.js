const DataLoader = require('dataloader');
const {
  batchGens,
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');

class Move {
    
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

  causesStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'status', 'causes', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  createsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'fieldState', 'creates', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  description(pagination, filter) {
    const databaseInfo = [pagination, filter, 'description', 'move', '', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  effect(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'effect', '', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  enablesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'move', 'requires', true];

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
  
  modifiesStat(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'stat', 'modifies', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  pokemon(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'move', '', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  removesFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'fieldState', 'removes', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  requiresItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'item', 'requires', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  requiresMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'move', 'requires', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  requiresPokemon(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'pokemon', 'requires', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  requiresType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'type', 'requires', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'status', 'resists', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  type(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'type', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  usageMethod(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'usageMethod', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
}

module.exports = new Move();