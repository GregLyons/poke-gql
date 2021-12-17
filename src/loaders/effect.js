const DataLoader = require('dataloader');
const {
  batchGens,
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');

class Effect {
  ability(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'effect', '', true];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  fieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'effect', '', true];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
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
  
  item(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'effect', '', true];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  move(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'effect', '', true];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }
}

module.exports = new Effect();