const DataLoader = require('dataloader');
const {db} = require('../models/index.js');

const batchEntitiesByGen = (presence = true, tableName) => {
  return async gens => {
    const entities = await db.promise().query(
      `
        SELECT * FROM ${tableName}
        WHERE ${presence ? 'generation_id' : 'introduced'} IN ?
      `, [[gens]]
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);
  
    return gens.map(gen => entities.filter(entity => entity.generation_id === gen));
  }
}

let generation = {};

['ability', 'effect', 'item', 'move', 'pokemon', 'type', 'usageMethod', 'versionGroup']
  .map(entityName => {
    generation[entityName] = {};

    // Determine appropriate table name for entity class.
    let tableName;
    switch(entityName) {
      case 'usageMethod':
        tableName = 'usage_method';
        break;
      case 'versionGroup':
        tableName = 'version_group';
        break;
      case 'type':
        tableName = 'ptype';
        break;
      default:
        tableName = entityName;
    }

    // Determine whether the entity has a 'presence' field (i.e. whether it changes across generations).
    let presence;
    switch(entityName) {
      case 'effect':
      case 'usageMethod':
      case 'versionGroup':
        presence = false;
        break;
      default:
        presence = true;
    }

    if (presence) {
      generation[entityName].present = new DataLoader(batchEntitiesByGen(true, tableName));
    }
    
    // The entity always has an 'introduced' field.
    generation[entityName].introduced = new DataLoader(batchEntitiesByGen(false, tableName));
    
    return;
  }, {});

module.exports = generation;