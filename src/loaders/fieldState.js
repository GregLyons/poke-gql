const DataLoader = require('dataloader');
const {
  batchGens,
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');


class FieldState {
    
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

  activatesAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'ability', 'activates', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  activatesItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'item', 'activates', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  boostsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'boosts', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  causesStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'status', 'causes', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  createdByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'creates', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  createdByMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'fieldState', 'creates', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  effect(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'effect', '', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  enhancesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'move', 'enhances', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  extendedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'extends', true];

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

  hindersMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'move', 'hinders', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  ignoredByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ignores', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  ignoredByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'ignores', true];

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
    const databaseInfo = [pagination, filter, 'fieldState', 'stat', 'modifies', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  preventedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'prevents', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  removedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'removes', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  removedByMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'fieldState', 'removes', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'resists', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistsStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'status', 'resists', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'resists', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  suppressedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'suppresses', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  weatherBall(pagination, filter) {
    return new DataLoader(junctionBatcher(pagination, filter, 'fieldState', 'type', 'weather_ball'))
  }
}

module.exports = new FieldState();