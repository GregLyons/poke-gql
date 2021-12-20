const DataLoader = require('dataloader');
const {
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');

class Description {
  
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

  ability(pagination, filter) {
    const databaseInfo = [pagination, filter, 'description', 'ability', 'pdescription_ability', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  item(pagination, filter) {
    const databaseInfo = [pagination, filter, 'description', 'item', 'pdescription_item', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  move(pagination, filter) {
    const databaseInfo = [pagination, filter, 'description', 'move', 'pdescription_pmove', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  versionGroup(pagination, filter) {
    const databaseInfo = [pagination, filter, 'versionGroup', 'description', 'version_group_pdescription', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
}

module.exports = new Description();