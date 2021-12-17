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

  load(key, id, pagination, filter, countMode) {
    const loader = this.findLoader(key, pagination, filter, countMode);
    return loader.load(id);
  }

  clearLoaders() {
    this.loaders = {};
  }

  findLoader(key, pagination, filter, countMode) {
    if (!this.loaders[key]) {
      this.loaders[key] = this[key](pagination, filter);
    }
    return countMode 
      ? this.loaders[key].counter
      : this.loaders[key].loader;
  }
}

let generation = {};

['ability', 'effect', 'fieldState', 'item', 'move', 'pokemon', 'type', 'stat', 'status', 'usageMethod', 'versionGroup']
  .map(entityName => {
    generation[entityName] = {};

    const tableName = entityNameToTableName(entityName);

    // Add 'present' and 'introduced' loaders for given entity.
    generation[entityName] = {
      present(pagination, filter) {
        if (!this.loader) {
          this.loader = new DataLoader(batchEntitiesByGen(true, tableName, pagination, filter))
        }
        if (!this.counter) {
          this.counter = new DataLoader(batchEntitiesByGenCount(true, tableName, pagination, filter))
        }
        return { 
          loader: this.loader,
          counter: this.counter,
        };
      },
      
      introduced(pagination, filter) {
        if (!this.loader) {
          this.loader = new DataLoader(batchEntitiesByGen(false, tableName, pagination, filter))
        }
        if (!this.counter) {
          this.counter = new DataLoader(batchEntitiesByGenCount(false, tableName, pagination, filter))
        }
        return { 
          loader: this.loader,
          counter: this.counter,
        };
      }
    };
    
    return;
  });

module.exports = generation;