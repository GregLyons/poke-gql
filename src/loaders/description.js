const DataLoader = require('dataloader');
const {
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');

class Description {
  ability(pagination, filter) {
    const databaseInfo = [pagination, filter, 'description', 'ability', '', false];

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

  item(pagination, filter) {
    const databaseInfo = [pagination, filter, 'description', 'item', '', false];

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
    const databaseInfo = [pagination, filter, 'description', 'move', '', false];

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
  versionGroup(pagination, filter) {
    const databaseInfo = [pagination, filter, 'versionGroup', 'description', '', true];

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

module.exports = new Description();