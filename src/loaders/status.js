const {
  getGenLoader,
  getLoaderAndCounter,
} = require('./helpers.js');

class Status {
    
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

  causedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'status', 'ability_causes_pstatus', true];
  }

  causedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'status', 'field_state_causes_pstatus', true];
  }

  causedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'status', 'item_causes_pstatus', true];
  }

  causedByMove(pagination, filter) {
    return [pagination, filter, 'move', 'status', 'pmove_causes_pstatus', true];
  }
  
  generation(pagination, filter) {
    return getGenLoader(pagination, filter);
  }

  introduced(pagination, filter) {
    return getGenLoader(pagination, filter);
  }
  
  resistedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'status', 'ability_resists_pstatus', true];
  }

  resistedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'status', 'field_state_prevents_pstatus', true];
  }

  resistedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'status', 'item_resists_pstatus', true];
  }

  resistedByMove(pagination, filter) {
    return [pagination, filter, 'move', 'status', 'pmove_resists_pstatus', true];
  }
}

module.exports = new Status();