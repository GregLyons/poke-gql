const DataLoader = require('dataloader');
const {
  batchGens,
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');

class Ability {
  
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
    const databaseInfo = [pagination, filter, 'fieldState', 'ability', 'activates', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  boostsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'type', 'boosts', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  boostsUsageMethod(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'usageMethod', 'boosts', false];

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

  createsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'creates', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  description(pagination, filter) {
    const databaseInfo = [pagination, filter, 'description', 'ability', '', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  effect(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'effect', '', false];

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
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ignores', false];

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
    const databaseInfo = [pagination, filter, 'ability', 'stat', 'modifies', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  pokemon(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'ability', '', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  preventsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'prevents', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  removesFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'removes', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistsStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'status', 'resists', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'type', 'resists', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistsUsageMethod(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'usageMethod', 'resists', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  suppressesFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'suppresses', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
}

module.exports = new Ability();