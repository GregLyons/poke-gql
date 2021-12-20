const {
  getGenLoader,
  getLoaderAndCounter,
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

  description(pagination, filter) {
    return [pagination, filter, 'versionGroup', 'description', 'version_group_pdescription', false];
  }

  introduced(pagination, filter) {
    return getGenLoader(pagination, filter);
  }
}

module.exports = new VersionGroup();