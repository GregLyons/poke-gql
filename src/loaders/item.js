const {
  getGenLoader,
  getLoaderAndCounter,
} = require('./helpers.js');

class Item {
    
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

  activatedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'item', 'field_state_activates_item', true];
  }

  boostsType(pagination, filter) {
    return [pagination, filter, 'item', 'type', 'item_boosts_ptype', false];
  }

  boostsUsageMethod(pagination, filter) {
    return [pagination, filter, 'item', 'usageMethod', 'item_boosts_usage_method', false];
  }

  causesStatus(pagination, filter) {
    return [pagination, filter, 'item', 'status', 'item_causes_pstatus', false];
  }

  description(pagination, filter) {
    return [pagination, filter, 'description', 'item', 'pdescription_item', true];
  }
  
  effect(pagination, filter) {
    return [pagination, filter, 'item', 'effect', 'item_effect', false];
  }
  
  enablesMove(pagination, filter) {
    return [pagination, filter, 'move', 'item', 'pmove_requires_item', true];
  }

  enablesPokemon(pagination, filter) {
    return [pagination, filter, 'pokemon', 'item', 'pokemon_requires_item', true];
  }

  extendsFieldState(pagination, filter) {
    return [pagination, filter, 'item', 'fieldState', 'item_extends_field_state', false];
  }

  generation(pagination, filter) {
    return getGenLoader(pagination, filter);
  }

  ignoresFieldState(pagination, filter) {
    return [pagination, filter, 'item', 'fieldState', 'item_ignores_field_state', false];
  }

  introduced(pagination, filter) {
    return getGenLoader(pagination, filter);
  }

  modifiesStat(pagination, filter) {
    return [pagination, filter, 'item', 'stat', 'item_modifies_stat', false];
  }

  // TODO
  naturalGift(pagination, filter) {
    return [pagination, filter, 'item', 'type', 'natural_gift', false];;

    return {
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo)),
    };
  }

  requiresPokemon(pagination, filter) {
    return [pagination, filter, 'item', 'pokemon', 'item_requires_pokemon', false];
  }

  resistsFieldState(pagination, filter) {
    return [pagination, filter, 'item', 'fieldState', 'item_resists_field_state', false];
  }

  resistsStatus(pagination, filter) {
    return [pagination, filter, 'item', 'status', 'item_resists_pstatus', false];
  }

  resistsType(pagination, filter) {
    return [pagination, filter, 'item', 'type', 'item_resists_ptype', false];
  }

  resistsUsageMethod(pagination, filter) {
    return [pagination, filter, 'item', 'usageMethod', 'item_resists_usage_method', false];
  }
}

module.exports = new Item();