const {
  getGenLoaderAndCounter,
} = require('./helpers.js');



/*
  Construct 'generation', an object whose keys are entity class names, with the corresponding values being objects.

  These nested objects consist of two attributes: 'present' and 'introduced', which are DataLoaders. These DataLoaders are for resolving the entity fields on Generation Nodes.
*/
class Generation {
  loaders = {}

  load(key, id, pagination, filter, countMode, presence) {
    const loader = this.findLoader(key, pagination, filter, countMode, presence);
    return loader.load(id);
  }

  clearLoaders() {
    this.loaders = {};
  }

  findLoader(key, pagination, filter, countMode, presence) {
    if (!presence) {
      key = key + 'Introduced';
    }
    if (!this.loaders[key]) {
      this.loaders[key] = getGenLoaderAndCounter(this[key](pagination, filter));
    }
    return countMode 
      ? this.loaders[key].counter
      : this.loaders[key].loader;
  }

  ability(pagination, filter) {
    return [true, 'ability', pagination, filter];
  }

  abilityIntroduced(pagination, filter) {
    return [false, 'ability', pagination, filter];
  }
  
  effect(pagination, filter) {
    return [true, 'effect', pagination, filter];
  }

  effectIntroduced(pagination, filter) {
    return [false, 'effect', pagination, filter];
  }

  fieldState(pagination, filter) {
    return [true, 'fieldState', pagination, filter];
  }

  fieldStateIntroduced(pagination, filter) {
    return [false, 'fieldState', pagination, filter];
  }

  item(pagination, filter) {
    return [true, 'item', pagination, filter];
  }

  itemIntroduced(pagination, filter) {
    return [false, 'item', pagination, filter];
  }

  move(pagination, filter) {
    return [true, 'move', pagination, filter];
  }

  moveIntroduced(pagination, filter) {
    return [false, 'move', pagination, filter];
  }

  pokemon(pagination, filter) {
    return [true, 'pokemon', pagination, filter];
  }

  pokemonIntroduced(pagination, filter) {
    return [false, 'pokemon', pagination, filter];
  }

  stat(pagination, filter) {
    return [true, 'stat', pagination, filter];
  }

  statIntroduced(pagination, filter) {
    return [false, 'stat', pagination, filter];
  }

  status(pagination, filter) {
    return [true, 'status', pagination, filter];
  }

  statusIntroduced(pagination, filter) {
    return [false, 'status', pagination, filter];
  }

  type(pagination, filter) {
    return [true, 'type', pagination, filter];
  }

  typeIntroduced(pagination, filter) {
    return [false, 'type', pagination, filter];
  }

  usageMethod(pagination, filter) {
    return [true, 'usageMethod', pagination, filter];
  }

  usageMethodIntroduced(pagination, filter) {
    return [false, 'usageMethod', pagination, filter];
  }

  versionGroup(pagination, filter) {
    return [true, 'versionGroup', pagination, filter];
  }

  versionGroupIntroduced(pagination, filter) {
    return [false, 'versionGroup', pagination, filter];
  }
}

module.exports = new Generation();