const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {getPaginationQueryString, getFilterQueryString} = require('./helpers.js');

/* 
  Returns a function to be passed into the constructor of a DataLoader object.

  If 'presence', entities should be batched by their presence in a generation, otherwise by when the generation in which they were introduced.

  'tableName' is the name of the database table containing the entity.

  'pagination' is an object with data for paginating the results.
*/
const batchEntitiesByGen = (presence = true, tableName, pagination, filter) => {
  return async gens => {
    // If the entity doesn't change across generations, then the database only stores one instance of that entity. To determine the presence of such an entity in a given generation, we check whether the debut gen of that entity is less than or eqal to the given generation.
    const genDependent = !['version_group'].includes(tableName);
    const genArray = Array.from(Array(8).keys());
    const gensToConsider = genDependent
      ? gens
      : presence
        ? genArray
        : genArray
          .map(i => i + 1)
          .filter(i => i >= Math.min(gens));

    // Extract pagination fields.
    const paginationString = getPaginationQueryString(pagination, tableName);
    const filterString = getFilterQueryString(filter, tableName);

    // Query the database
    const entities = await db.promise().query(
      `
        SELECT * FROM ${tableName}
        WHERE ${presence && genDependent ? 'generation_id' : 'introduced'} IN ?
        ${filterString}
        ${paginationString}
      `, [[gensToConsider]]
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);

    return gens.map(gen => entities.filter(entity => 
      genDependent
        ? entity.generation_id === gen
        : presence 
          ? entity.introduced <= gen
          : entity.introduced === gen
    ));
  }
}

/*
  Construct 'generation', an object whose keys are entity class names, with the corresponding values being objects.

  These nested objects consist of two attributes: 'present' and 'introduced', which are DataLoaders. These DataLoaders are for resolving the entity fields on Generation Nodes.
*/
let generation = {};

['ability', 'effect', 'item', 'move', 'pokemon', 'type', 'stat', 'status', 'usageMethod', 'versionGroup']
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
      case 'status':
        tableName = 'pstatus';
      default:
        tableName = entityName;
    }

    // Add 'present' and 'introduced' loaders for given entity.
    generation[entityName] = {
      present(pagination, filter) {
        return new DataLoader(batchEntitiesByGen(true, tableName, pagination, filter));
      },
      introduced(pagination, filter) {
        return new DataLoader(batchEntitiesByGen(false, tableName, pagination, filter));
      }
    };
    
    return;
  });

module.exports = generation;