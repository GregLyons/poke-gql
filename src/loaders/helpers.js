const {
  db,

  computeGenerationTableQueryString,
  computeJunctionTableQueryString,
  entityNameToTableName,
  escapeObjectParameters,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID
} = require('../models/index.js');

// DataLoader batcher for selecting from the 'generation' table.
const batchGens = (pagination, filter) => {
  return async gens => {
    const filterString = getFilterQueryString(filter, 'generation');
    const paginationString = getPaginationQueryString(pagination, 'generation');

    const genData = await db.promise().query(
      `
        SELECT * FROM generation
        WHERE generation_id IN ?
        ${filterString}
        ${paginationString}
      `, [[gens]]
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);

    return gens.map(gen => genData.filter(genDatum => genDatum.generation_id === gen));
  }
}

// DataLoader batcher for selecting from junction tables.
/*
  'pagination' and 'filter' are objects for getPaginationQueryString and getFilterQueryString, respectively. 'pagination' is the first argument of databaseInfo.

  'owner' and 'owned' refer to the two types of entities in the relationship. For example, in 'ability_effect', 'ability' is the owner, and 'effect' is owned in the relationship. As another example, 'ability_causes_status', 'ability' is again the owner, and 'status' is owned. 

  'middle' is for further determining which junction table, e.g. 'causes' versus 'resists' when 'ability' is the owner and 'status' is owned. 

  'reverse' is used for the inverse relationship. For example, in 'ability_causes_status', we may either be interested in the ability or the status. 'reverse' being false means that we're interested in the owner, i.e. the ability, whereas 'reverse' being true means that we're interested in the owned entity, i.e. the status.
*/
const junctionBatcher = databaseInfo => {
  return async entityPKs => {
    const {
      startTableName,
      junctionStartGen,
      junctionStartID,
      queryString
    } = computeJunctionTableQueryString(databaseInfo, false, true)

    // Query the database.
    const data = await db.promise().query(
      queryString,
      [[entityPKs.map(d => {
        return hasGenID(startTableName) 
          ? [d.genID, d.entityID]
          : [d.entityID];
      })]]
      )
      .then( ([results, fields]) => {
        return results;
      })
      .catch(console.log);

      
    const batches = entityPKs.map(entityPK => data.filter(d => 
      hasGenID(startTableName)
      ? d[junctionStartGen] === entityPK.genID 
      && d[junctionStartID] === entityPK.entityID
      : d[junctionStartID] === entityPK.entityID)
    )
    
    // Extract limit and offset from 'pagination' and slice each batch accordingly.
    const limitOffset = databaseInfo[0];

    return batches.map(batch => {
      return limitOffset 
        ? limitOffset.limit 
          ? limitOffset.offset 
            // Limit and offset both defined
            ? batch.slice(limitOffset.offset, limitOffset.offset + limitOffset.limit)
            // No offset
            : batch.slice(0, limitOffset.limit)
          : limitOffset.offset
            // No limit
            ? batch.slice(limitOffset.offset)
            // No limit or offset
            : batch
        // No limit or offset
        : batch;
    });
  }
}

// DataLoader batcher for counting selections from junction tables. For more information on databaseInfo, see junctionBatcher.
const junctionBatcherCount = databaseInfo => {
  return async entityPKs => {
    const {
      startTableName,
      junctionStartGen,
      junctionStartID,
      queryString
    } = computeJunctionTableQueryString(databaseInfo, true, true);

    // Query the database.
    const data = await db.promise().query(
      queryString,
      [[entityPKs.map(d => {
        return hasGenID(startTableName) 
          ? [d.genID, d.entityID]
          : [d.entityID];
      })]]
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);

    let batches = entityPKs.map(entityPK => 
      data
      .filter(d => 
        hasGenID(startTableName)
          ? d[junctionStartGen] === entityPK.genID 
            && d[junctionStartID] === entityPK.entityID
          : d[junctionStartID] === entityPK.entityID
        )
      // Select row_count property from results.
      .map(d => d.row_count)
      // If 'undefined' is returned, this means that nothing was found to match entityPK. This happens, for example, when looking up the Description in Sword/Shield for 'abomasite', since that Item was removed from the game, and hence has no description. The same happens for Moves removed from Sword/Shield. In this case, we set the count to 0.
      .map(d => d || 0)
    )
    .map(d => d[0] || 0);

    return batches && batches.length > 0 
      ? batches
      : [0];
  }
}

/* 
  Returns a function to be passed into the constructor of a DataLoader object.

  If 'presence', entities should be batched by their presence in a generation, otherwise by when the generation in which they were introduced.

  'tableName' is the name of the database table containing the entity.

  'pagination' is an object with data for paginating the results.
*/
const batchEntitiesByGen = (presence = true, entityName, pagination, filter) => {
  const tableName = entityNameToTableName(entityName);

  return async gens => {
    const genDependent = hasGenID(tableName);

    const queryString = computeGenerationTableQueryString(presence, tableName, pagination, filter, false);

    // Query the database
    const entities = await db.promise().query(
      queryString, 
      [[gens]]
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);

    const batches = gens.map(gen => entities.filter(entity => 
      genDependent
        ? entity.generation_id === gen
        : presence 
          ? entity.introduced <= gen
          : entity.introduced === gen
    ));

    // Extract limit and offset from 'pagination' and slice each batch accordingly.
    const limitOffset = pagination;

    return batches.map(batch => {
      return limitOffset 
        ? limitOffset.limit 
          ? limitOffset.offset 
            // Limit and offset both defined
            ? batch.slice(limitOffset.offset, limitOffset.offset + limitOffset.limit)
            // No offset
            : batch.slice(0, limitOffset.limit)
          : limitOffset.offset
            // No limit
            ? batch.slice(limitOffset.offset)
            // No limit or offset
            : batch
        // No limit or offset
        : batch;
    });
  }
}

/* 
  Returns a function to be passed into the constructor of a DataLoader object.

  If 'presence', entities should be batched by their presence in a generation, otherwise by when the generation in which they were introduced.

  'tableName' is the name of the database table containing the entity.

  'pagination' is an object with data for paginating the results.
*/
const batchEntitiesByGenCount = (presence = true, entityName, pagination, filter) => {

  const tableName = entityNameToTableName(entityName);

  return async gens => {
    const genDependent = hasGenID(tableName);
    // const genArray = Array.from(Array(8).keys());
    // const gensToConsider = genDependent
    //   ? gens
    //   : presence
    //     ? genArray
    //     : genArray
    //       .map(i => i + 1)
    //       .filter(i => i >= Math.min(gens));
          
    const queryString = computeGenerationTableQueryString(presence, tableName, pagination, filter, true);
    // Query the database
    const entities = await db.promise().query(
      queryString, 
      [[gens]]
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);
    
    // Extract limit and offset from pagination object.
    // const limitOffset = databaseInfo[0]
    // let limit, offset;
    // if (limitOffset) {
    //   limit = limitOffset.limit ? limitOffset.limit : -1;
    //   offset = limitOffset.offset ? limitOffset.offset : 0;
    // }

    const batch = gens.map(gen => entities.filter(entity => 
        genDependent
          ? entity.generation_id === gen
          : presence 
            ? entity.introduced <= gen
            : entity.introduced === gen
      )
      .map(d => {
        return d.row_count;
      })
    )
    .map(d => d[0])
    .map(d => d || 0);

    return batch.length > 0
      ? batch
      : [0];
  }
}

module.exports = {
  batchGens,

  batchEntitiesByGen,
  batchEntitiesByGenCount,
  
  junctionBatcher,
  junctionBatcherCount,
}