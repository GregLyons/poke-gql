const DataLoader = require('dataloader');
const {
  batchGens,
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');

class Stat {
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

  modifiedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'stat', 'modifies', true];

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

  modifiedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'stat', 'modifies', true];

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

  modifiedByMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'stat', 'modifies', true];

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

module.exports = new Stat();