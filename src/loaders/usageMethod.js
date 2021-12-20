const {
  getGenLoader,
  getLoaderAndCounter,
} = require('./helpers.js');

class UsageMethod {
    
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

  boostedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'usageMethod', 'ability_boosts_usage_method', true];
  }

  boostedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'usageMethod', 'item_boosts_usage_method', true];
  }

  generation(pagination, filter) {
    return getGenLoader(pagination, filter);
  }

  introduced(pagination, filter) {
    return getGenLoader(pagination, filter);
  }

  move(pagination, filter) {
    return [pagination, filter, 'move', 'usageMethod', 'pmove_usage_method', true];
  }
  
  resistedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'usageMethod', 'ability_resists_usage_method', true];
  }

  resistedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'usageMethod', 'item_resists_usage_method', true];
  }
}

module.exports = new UsageMethod();