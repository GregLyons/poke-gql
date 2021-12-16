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
let generation = {};

['ability', 'effect', 'fieldState', 'item', 'move', 'pokemon', 'type', 'stat', 'status', 'usageMethod', 'versionGroup']
  .map(entityName => {
    generation[entityName] = {};

    const tableName = entityNameToTableName(entityName);

    // Add 'present' and 'introduced' loaders for given entity.
    generation[entityName] = {
      present(pagination, filter) {
        return {
          loader: function() { 
            return new DataLoader(batchEntitiesByGen(true, tableName, pagination, filter));
          },

          counter: function() { 
            return new DataLoader(batchEntitiesByGenCount(true, tableName, pagination, filter));
          },
        }
      },
      
      introduced(pagination, filter) {
        return {
          loader: function() { 
            return new DataLoader(batchEntitiesByGen(false, tableName, pagination, filter));
          },

          counter: function() { 
            return new DataLoader(batchEntitiesByGenCount(false, tableName, pagination, filter));
          },
        }
      }
    };
    
    return;
  });

module.exports = generation;