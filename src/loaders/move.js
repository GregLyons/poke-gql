const {
  getGenLoader,
  getLoaderAndCounter,
} = require('./helpers.js');

class Move {
    
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

  causesStatus(pagination, filter) {
    return [pagination, filter, 'move', 'status', 'pmove_causes_pstatus', false];
  }

  createsFieldState(pagination, filter) {
    return [pagination, filter, 'move', 'fieldState', 'pmove_creates_field_state', false];
  }

  description(pagination, filter) {
    return [pagination, filter, 'description', 'move', 'pdescription_pmove', true];
  }
  
  effect(pagination, filter) {
    return [pagination, filter, 'move', 'effect', 'pmove_effect', false];
  }
  
  enablesMove(pagination, filter) {
    return [pagination, filter, 'move', 'move', 'pmove_requires_pmove', true];
  }

  enhancedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'move', 'field_state_enhances_pmove', true];
  }
  
  generation(pagination, filter) {
    return getGenLoader(pagination, filter);
  }

  hinderedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'move', 'field_state_hinders_pmove', true];
  }
  
  introduced(pagination, filter) {
    return getGenLoader(pagination, filter);
  }
  
  modifiesStat(pagination, filter) {
    return [pagination, filter, 'move', 'stat', 'pmove_modifies_stat', false];
  }

  pokemon(pagination, filter) {
    return [pagination, filter, 'pokemon', 'move', 'pokemon_pmove', true];
  }
  
  removesFieldState(pagination, filter) {
    return [pagination, filter, 'move', 'fieldState', 'pmove_removes_field_state', false];
  }

  requiresItem(pagination, filter) {
    return [pagination, filter, 'move', 'item', 'pmove_requires_item', false];
  }
  
  requiresMove(pagination, filter) {
    return [pagination, filter, 'move', 'move', 'pmove_requires_pmove', false];
  }
  
  requiresPokemon(pagination, filter) {
    return [pagination, filter, 'move', 'pokemon', 'pmove_requires_pokemon', false];
  }
  
  requiresType(pagination, filter) {
    return [pagination, filter, 'move', 'type', 'pmove_requires_ptype', false];
  }

  resistsStatus(pagination, filter) {
    return [pagination, filter, 'move', 'status', 'pmove_resists_pstatus', false];
  }
  
  type(pagination, filter) {
    return [pagination, filter, 'move', 'type', 'pmove_ptype', false];
  }

  usageMethod(pagination, filter) {
    return [pagination, filter, 'move', 'usageMethod', 'pmove_usage_method', false];
  }
}

module.exports = new Move();