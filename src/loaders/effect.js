const {
  getGenLoader,
  getLoaderAndCounter,
} = require('./helpers.js');

class Effect {
  
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
    return [pagination, filter, 'ability', 'effect', 'ability_effect', true];
  }

  fieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'effect', 'field_state_effect', true];
  }
  
  generation(pagination, filter) {
    return getGenLoader(pagination, filter);
  }

  introduced(pagination, filter) {
    return getGenLoader(pagination, filter);
  }
  
  item(pagination, filter) {
    return [pagination, filter, 'item', 'effect', 'item_effect', true];
  }

  move(pagination, filter) {
    return [pagination, filter, 'move', 'effect', 'pmove_effect', true];
  }
}

module.exports = new Effect();