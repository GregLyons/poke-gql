const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
  basicJunctionBatcherCount,
} = require('./helpers.js');

class Stat {
  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  }

  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  }

  modifiedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'stat', 'modifies', true];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  modifiedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'stat', 'modifies', true];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  modifiedByMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'stat', 'modifies', true];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }
}

module.exports = new Stat();