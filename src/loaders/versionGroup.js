const DataLoader = require('dataloader');
const {
  batchGens,
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');

class VersionGroup {
    
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

  description(pagination, filter) {
    const databaseInfo = [pagination, filter, 'versionGroup', 'description', '', false];

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
}

module.exports = new VersionGroup();