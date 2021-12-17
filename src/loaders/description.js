const DataLoader = require('dataloader');
const {
  basicJunctionBatcher,
  basicJunctionBatcherCount,
} = require('./helpers.js');

class Description {
  versionGroup(pagination, filter) {
    const databaseInfo = [pagination, filter, 'versionGroup', 'description', '', true];

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

module.exports = new Description();