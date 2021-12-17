const DataLoader = require('dataloader');
const {
  batchGens,
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');

class Status {
    
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

  causedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'status', 'causes', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  causedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'status', 'causes', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  causedByMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'status', 'causes', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  generation(pagination, filter) {
    if (!this.loader) {
      this.loader = new DataLoader(batchGens(pagination, filter))
    }
    return { 
      loader: this.loader,
    };
  }

  introduced(pagination, filter) {
    if (!this.loader) {
      this.loader = new DataLoader(batchGens(pagination, filter))
    }
    return { 
      loader: this.loader,
    };
  }
  
  resistedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'status', 'resists', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'status', 'resists', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistedByMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'status', 'resists', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
}

module.exports = new Status();