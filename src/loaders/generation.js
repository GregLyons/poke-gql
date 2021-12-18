const DataLoader = require('dataloader');
const {
  entityNameToTableName,
} = require('../models/index.js');
const {
  batchEntitiesByGen,
  batchEntitiesByGenCount,
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
      this.loaders[key] = this[key](pagination, filter);
    }
    return countMode 
      ? this.loaders[key].counter
      : this.loaders[key].loader;
  }

  ability(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(true, 'ability', pagination, filter)),

      counter: new DataLoader(batchEntitiesByGenCount(true, 'ability', pagination, filter))
    }
  }

  abilityIntroduced(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(false, 'ability', pagination, filter)),
      counter: new DataLoader(batchEntitiesByGenCount(false, 'ability', pagination, filter))
    }
  }
  
  effect(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(true, 'effect', pagination, filter)),

      counter: new DataLoader(batchEntitiesByGenCount(true, 'effect', pagination, filter))
    }
  }

  effectIntroduced(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(false, 'effect', pagination, filter)),
      counter: new DataLoader(batchEntitiesByGenCount(false, 'effect', pagination, filter))
    }
  }

  fieldState(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(true, 'fieldState', pagination, filter)),

      counter: new DataLoader(batchEntitiesByGenCount(true, 'fieldState', pagination, filter))
    }
  }

  fieldStateIntroduced(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(false, 'fieldState', pagination, filter)),
      counter: new DataLoader(batchEntitiesByGenCount(false, 'fieldState', pagination, filter))
    }
  }

  item(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(true, 'item', pagination, filter)),

      counter: new DataLoader(batchEntitiesByGenCount(true, 'item', pagination, filter))
    }
  }

  itemIntroduced(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(false, 'item', pagination, filter)),
      counter: new DataLoader(batchEntitiesByGenCount(false, 'item', pagination, filter))
    }
  }

  move(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(true, 'move', pagination, filter)),

      counter: new DataLoader(batchEntitiesByGenCount(true, 'move', pagination, filter))
    }
  }

  moveIntroduced(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(false, 'move', pagination, filter)),
      counter: new DataLoader(batchEntitiesByGenCount(false, 'move', pagination, filter))
    }
  }

  pokemon(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(true, 'pokemon', pagination, filter)),

      counter: new DataLoader(batchEntitiesByGenCount(true, 'pokemon', pagination, filter))
    }
  }

  pokemonIntroduced(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(false, 'pokemon', pagination, filter)),
      counter: new DataLoader(batchEntitiesByGenCount(false, 'pokemon', pagination, filter))
    }
  }

  stat(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(true, 'stat', pagination, filter)),

      counter: new DataLoader(batchEntitiesByGenCount(true, 'stat', pagination, filter))
    }
  }

  statIntroduced(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(false, 'stat', pagination, filter)),
      counter: new DataLoader(batchEntitiesByGenCount(false, 'stat', pagination, filter))
    }
  }

  status(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(true, 'status', pagination, filter)),

      counter: new DataLoader(batchEntitiesByGenCount(true, 'status', pagination, filter))
    }
  }

  statusIntroduced(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(false, 'status', pagination, filter)),
      counter: new DataLoader(batchEntitiesByGenCount(false, 'status', pagination, filter))
    }
  }

  type(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(true, 'type', pagination, filter)),

      counter: new DataLoader(batchEntitiesByGenCount(true, 'type', pagination, filter))
    }
  }

  typeIntroduced(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(false, 'type', pagination, filter)),
      counter: new DataLoader(batchEntitiesByGenCount(false, 'type', pagination, filter))
    }
  }

  usageMethod(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(true, 'usageMethod', pagination, filter)),

      counter: new DataLoader(batchEntitiesByGenCount(true, 'usageMethod', pagination, filter))
    }
  }

  usageMethodIntroduced(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(false, 'usageMethod', pagination, filter)),
      counter: new DataLoader(batchEntitiesByGenCount(false, 'usageMethod', pagination, filter))
    }
  }

  versionGroup(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(true, 'versionGroup', pagination, filter)),

      counter: new DataLoader(batchEntitiesByGenCount(true, 'versionGroup', pagination, filter))
    }
  }

  versionGroupIntroduced(pagination, filter) {
    return {
      loader: new DataLoader(batchEntitiesByGen(false, 'versionGroup', pagination, filter)),
      counter: new DataLoader(batchEntitiesByGenCount(false, 'versionGroup', pagination, filter))
    }
  }
}

module.exports = new Generation();