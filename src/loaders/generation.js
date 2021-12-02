const DataLoader = require('dataloader');
const {db} = require('../models/index.js');

const batchEntitiesByGen = (presence = true, tableName) => {
  return async gens => {
    const genDependent = !['effect', 'usage_method', 'version_group'].includes(tableName);
    const genArray = Array.from(Array(8).keys());
    const gensToConsider = genDependent
      ? gens
      : presence
        ?genArray
        : genArray
          .map(i => i + 1)
          .filter(i => i >= Math.min(gens));

    const entities = await db.promise().query(
      `
        SELECT * FROM ${tableName}
        WHERE ${presence && genDependent ? 'generation_id' : 'introduced'} IN ?
      `, [[gensToConsider]]
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);

    return gens.map(gen => entities.filter(entity => genDependent
      ? entity.generation_id === gen
      : presence 
        ? entity.introduced <= gen
        : entity.introduced === gen
    ));
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
      case 'move':
        tableName = 'pmove';
        break;
      default:
        tableName = entityName;
    }

    generation[entityName].present = new DataLoader(batchEntitiesByGen(true, tableName));
    
    // The entity always has an 'introduced' field.
    generation[entityName].introduced = new DataLoader(batchEntitiesByGen(false, tableName));
    
    return;
  }, {});

module.exports = generation;