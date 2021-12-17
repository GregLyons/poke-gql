const DataLoader = require('dataloader');
const {
  batchGens,
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');

class Type {
    
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

  boostedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'type', 'boosts', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  boostedByFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'boosts', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  boostedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'type', 'boosts', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  // TODO
  defensiveMatchup(pagination, filter) {
    return new DataLoader(junctionBatcher(pagination, filter, 'type', 'type', 'ptype_matchup', true))
  }
  
  enablesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'type', 'requires', true];

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

  ignoresFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'type', 'fieldState', 'ignores', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
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
  
  move(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'type', '', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  // TODO
  naturalGift(pagination, filter) {
    return new DataLoader(junctionBatcher(pagination, filter, 'item', 'type', 'natural_gift', true))
  }
  
  pokemon(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'type', '', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  // TODO
  offensiveMatchup(pagination, filter) {
    return new DataLoader(junctionBatcher(pagination, filter, 'type', 'type', 'ptype_matchup'))
  }

  removesFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'type', 'fieldState', 'removes', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  resistedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'type', 'resists', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistedByFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'resists', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'type', 'resists', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'type', 'fieldState', 'resists', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  weatherBall(pagination, filter) {
    return new DataLoader(junctionBatcher(pagination, filter, 'fieldState', 'type', 'natural_gift', true))
  }
}

module.exports = new Type();