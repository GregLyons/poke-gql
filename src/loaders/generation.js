const {
  getGenToEntityCounter,
  getGenToEntityLoader,

  LoadersForEntity,
} = require('./helpers.js');

// Unlike for most other entities, we override some of the methods defined in LoadersForEntity.
class GenerationLoaders extends LoadersForEntity {
  
  constructor() {
    super();
  }

  // If 'presence' is true, the query concerns entities present in the given generation. If 'false', it concerns entities introduced in the given generation.
  load(key, id, pagination, filter, countMode, presence) {
    const loader = this.findLoader(key, pagination, filter, countMode, presence);
    return loader.load(id);
  }

  findLoader(key, pagination, filter, countMode, presence) {
    if (!presence) {
      key = key + 'Introduced';
    }
    // A different form of loader/counter is necessary for Generation.
    if (!this.loaders[key]) {
      this.loaders[key] = {}
    }
    //
    if (!countMode && !this.loaders[key].loader) {
      this.loaders[key].loader = getGenToEntityLoader(this[key](pagination, filter));
    }
    //
    if (countMode && !this.loaders[key].counter) {
      this.loaders[key].counter = getGenToEntityCounter(this[key](pagination, filter));
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

module.exports = new GenerationLoaders();