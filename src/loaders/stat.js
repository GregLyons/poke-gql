const {
  getGenLoader,
  getLoaderAndCounter,
} = require('./helpers.js');

class Stat {
    
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

  generation(pagination, filter) {
    return getGenLoader(pagination, filter);
  }

  introduced(pagination, filter) {
    return getGenLoader(pagination, filter);
  }

  modifiedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'stat', 'ability_modifies_stat', true];
  }

  modifiedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'stat', 'field_state_modifies_stat', true];
  }

  modifiedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'stat', 'item_modifies_stat', true];
  }

  modifiedByMove(pagination, filter) {
    return [pagination, filter, 'move', 'stat', 'pmove_modifies_stat', true];
  }
}

module.exports = new Stat();