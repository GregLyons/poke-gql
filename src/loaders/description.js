const {
  getGenLoader,
  getLoaderAndCounter,
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
      if (['generation', 'introduced'].includes(key)) {
        this.loaders[key] = this[key](pagination, filter);
      }
      else {
        this.loaders[key] = getLoaderAndCounter(this[key](pagination, filter));
      }
    }
    return countMode 
      ? this.loaders[key].counter
      : this.loaders[key].loader;
  }

  ability(pagination, filter) {
    return [pagination, filter, 'description', 'ability', 'pdescription_ability', false];
  }

  item(pagination, filter) {
    return [pagination, filter, 'description', 'item', 'pdescription_item', false];
  }
  
  move(pagination, filter) {
    return [pagination, filter, 'description', 'move', 'pdescription_pmove', false];
  }

  versionGroup(pagination, filter) {
    return [pagination, filter, 'versionGroup', 'description', 'version_group_pdescription', true];
  }
}

module.exports = new Description();