const {
  getGenLoader,
  getLoaderAndCounter,
} = require('./helpers.js');

class Type {
    
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
    return [pagination, filter, 'ability', 'type', 'ability_boosts_ptype', true];
  }

  boostedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'type', 'field_state_boosts_ptype', true];
  }

  boostedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'type', 'item_boosts_ptype', true];
  }

  // TODO
  defensiveMatchup(pagination, filter) {
    return [pagination, filter, 'type', 'type', 'ptype_matchup', true];;
  
    return getLoaderAndCounter(databaseInfo);
  }
  
  enablesMove(pagination, filter) {
    return [pagination, filter, 'move', 'type', 'pmove_requires_ptype', true];
  }
  
  generation(pagination, filter) {
    return getGenLoader(pagination, filter);
  }

  ignoresFieldState(pagination, filter) {
    return [pagination, filter, 'type', 'fieldState', 'ptype_ignores_field_state', false];
  }

  introduced(pagination, filter) {
    return getGenLoader(pagination, filter);
  }
  
  move(pagination, filter) {
    return [pagination, filter, 'move', 'type', 'pmove_ptype', true];
  }
  
  // TODO
  naturalGift(pagination, filter) {
    return [pagination, filter, 'item', 'type', 'natural_gift', true];;
  
    return getLoaderAndCounter(databaseInfo);
  }
  
  pokemon(pagination, filter) {
    return [pagination, filter, 'pokemon', 'type', 'pokemon_ptype', true];
  }

  // TODO
  offensiveMatchup(pagination, filter) {
    return [pagination, filter, 'type', 'type', 'ptype_matchup', true];;
  
    return getLoaderAndCounter(databaseInfo);
  }

  removesFieldState(pagination, filter) {
    return [pagination, filter, 'type', 'fieldState', 'ptype_removes_field_state', false];
  }
  
  resistedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'type', 'ability_resists_ptype', true];
  }

  resistedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'type', 'field_state_resists_ptype', true];
  }

  resistedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'type', 'item_resists_ptype', true];
  }

  resistsFieldState(pagination, filter) {
    return [pagination, filter, 'type', 'fieldState', 'ptype_resists_field_state', false];
  }

  weatherBall(pagination, filter) {
    return [pagination, filter, 'fieldState', 'type', 'weather_ball', true];;
  
    return getLoaderAndCounter(databaseInfo);
  }
}

module.exports = new Type();