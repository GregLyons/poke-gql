const {
  db,

  computeJunctionTableName,
  entityNameToTableName,
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
  'pagination' and 'filter' are objects for getPaginationQueryString and getFilterQueryString, respectively. 

  'owner' and 'owned' refer to the two types of entities in the relationship. For example, in 'ability_effect', 'ability' is the owner, and 'effect' is owned in the relationship. As another example, 'ability_causes_status', 'ability' is again the owner, and 'status' is owned. 

  'middle' is for further determining which junction table, e.g. 'causes' versus 'resists' when 'ability' is the owner and 'status' is owned. 

  'reverse' is used for the inverse relationship. For example, in 'ability_causes_status', we may either be interested in the ability or the status. 'reverse' being false means that we're interested in the owner, i.e. the ability, whereas 'reverse' being true means that we're interested in the owned entity, i.e. the status.
*/
const basicJunctionBatcher = ([pagination, filter, ownerEntityName, ownedEntityName, middle, reverse]) => {
  return async entityPKs => {
    // A trick so the code can handle both cases of 'reverse.'
    if (reverse) {
      [ownerEntityName, ownedEntityName] = [ownedEntityName, ownerEntityName]
    }

    // Compute table and column names for the owner and owned entities.
    const ownerTableName = entityNameToTableName(ownerEntityName);

    const ownedTableName = entityNameToTableName(ownedEntityName);
    const ownedID = ownedTableName + '_id';

    // Compute junction table name based on the owner and owned entity names, as well as 'middle'.
    const junctionTableName = computeJunctionTableName(ownerTableName, ownedTableName, middle, reverse);

    // May need to change column names when looking at the junction table, e.g. when owned and owner are the same type of entity, as in 'pmove_requires_pmove' (move requiring a move).
    let junctionOwnedID, junctionOwnedGen;
    switch (junctionTableName) {
      // 'base_pmove_generation_id'
      case 'pmove_requires_pmove':
        // 'owned' is the move being required, i.e. base move
        if(!reverse) {
          junctionOwnerID = 'requiring_pmove_id';
          junctionOwnerGen = 'requiring_pmove_generation_id';
          junctionOwnedID = 'required_pmove_id';
          junctionOwnedGen = 'required_pmove_generation_id';
        } 
        // 'owned' is the move doing the requiring 
        else {
          junctionOwnerID = 'required_pmove_id';
          junctionOwnerGen = 'required_pmove_generation_id';
          junctionOwnedID = 'requiring_pmove_id';
          junctionOwnedGen = 'requiring_pmove_generation_id';
        }
        break;
      case 'natural_gift':
        // 'owned' is the type
        if(!reverse) {
          junctionOwnerID = 'item_id';
          junctionOwnerGen = 'item_generation_id';
          junctionOwnedID = 'ptype_id';
          junctionOwnedGen = 'ptype_generation_id';
        }
        // 'owned' is the item
        else {
          junctionOwnerID = 'ptype_id';
          junctionOwnerGen = 'ptype_generation_id';
          junctionOwnedID = 'item_id';
          junctionOwnedGen = 'item_generation_id';
        }
        break;
      case 'weather_ball':
        // 'owned' is the type
        if(!reverse) {
          junctionOwnerID = 'field_state_id';
          junctionOwnerGen = 'field_state_generation_id';
          junctionOwnedID = 'ptype_id';
          junctionOwnedGen = 'ptype_generation_id';
        }
        // 'owned' is the item
        else {
          junctionOwnerID = 'ptype_id';
          junctionOwnerGen = 'ptype_generation_id';
          junctionOwnedID = 'field_state_id';
          junctionOwnedGen = 'field_state_generation_id';
        }
        break;
      case 'ptype_matchup':
        // 'owned' is the offensive type
        if(!reverse) {
          junctionOwnerID = 'attacking_ptype_id';
          junctionOwnerGen = 'attacking_ptype_generation_id';
          junctionOwnedID = 'defending_ptype_id';
          junctionOwnedGen = 'defending_ptype_generation_id';
        }
        // 'owned' is the defensive type
        else {
          junctionOwnerID = 'defending_ptype_id';
          junctionOwnerGen = 'defending_ptype_generation_id';
          junctionOwnedID = 'attacking_ptype_id';
          junctionOwnedGen = 'attacking_ptype_generation_id';
        }
        break;
      case 'pokemon_evolution':
        // 'owned' is the evolution
        if(!reverse) {
          junctionOwnerID = 'prevolution_id';
          junctionOwnerGen = 'prevolution_generation_id';
          junctionOwnedID = 'evolution_id';
          junctionOwnedGen = 'evolution_generation_id';
        }
        // 'owned' is the prevolution
        else {
          junctionOwnerID = 'evolution_id';
          junctionOwnerGen = 'evolution_generation_id';
          junctionOwnedID = 'prevolution_id';
          junctionOwnedGen = 'prevolution_generation_id';
        }
        break;
      case 'pokemon_form':
        // 'owned' is the alternate form
        if(!reverse) {
          junctionOwnerID = 'base_form_id';
          junctionOwnerGen = 'base_form_generation_id';
          junctionOwnedID = 'form_id';
          junctionOwnedGen = 'form_generation_id';
        }
        // 'owned' is the base form
        else {
          junctionOwnerID = 'form_id';
          junctionOwnerGen = 'form_generation_id';
          junctionOwnedID = 'base_form_id';
          junctionOwnedGen = 'base_form_generation_id';
        }
        break;
      default:
        junctionOwnerID = ownerTableName + '_id';
        junctionOwnerGen = ownerTableName + '_generation_id';
        junctionOwnedID = ownedTableName + '_id';
        junctionOwnedGen = ownedTableName + '_generation_id';
    }

    // Compute ON clause for the JOIN statement.
    const onString = hasGenID(ownedTableName) 
      ? `ON (${junctionTableName}.${junctionOwnedGen}, ${junctionTableName}.${junctionOwnedID}) = (${ownedTableName}.generation_id, ${ownedTableName}.${ownedID})`
      : `ON ${junctionTableName}.${junctionOwnedID} = ${ownedTableName}.${ownedID}`;

    // If the two entity tables are the same, then ambiguity will arise without the junction table name.
    const whereString = hasGenID(ownerTableName) 
      ? `WHERE (${junctionTableName}.${junctionOwnerGen}, ${junctionTableName}.${junctionOwnerID}) IN ?`
      : `WHERE (${junctionTableName}.${junctionOwnerID}) IN ?`

    // Filtering and pagination strings.
    const filterString = getFilterQueryString(filter, ownedTableName);
    const paginationString = getPaginationQueryString(pagination, junctionTableName);

    // Query the database.
    const data = await db.promise().query(
      `
        SELECT * FROM ${junctionTableName} RIGHT JOIN ${ownedTableName} 
        ${onString}
        ${whereString}
        ${filterString}
        ${paginationString}
      `,
      [[entityPKs.map(d => {
        return hasGenID(ownerTableName) 
          ? [d.genID, d.entityID]
          : [d.entityID];
      })]]
    )
    .then( ([results, fields]) => {
      // console.log(`
      //   SELECT * FROM ${junctionTableName} RIGHT JOIN ${ownedTableName} 
      //   ${onString}
      //   ${whereString}
      //   ${filterString}
      //   ${paginationString}
      // `)
      // console.log(entityPKs.map(d => {
      //   return isGenDependent(owner) 
      //     ? [d.genID, d.entityID]
      //     : [d.entityID];
      // }))
      // console.log(results);
      return results;
    })
    .catch(console.log);

    return entityPKs.map(entityPK => data.filter(d => 
      d[junctionOwnerGen] === entityPK.genID 
      && d[junctionOwnerID] === entityPK.entityID));
  }
}

// DataLoader batcher for selecting from junction tables. COUNT
/*
  'pagination' and 'filter' are objects for getPaginationQueryString and getFilterQueryString, respectively. 

  'owner' and 'owned' refer to the two types of entities in the relationship. For example, in 'ability_effect', 'ability' is the owner, and 'effect' is owned in the relationship. As another example, 'ability_causes_status', 'ability' is again the owner, and 'status' is owned. 

  'middle' is for further determining which junction table, e.g. 'causes' versus 'resists' when 'ability' is the owner and 'status' is owned. 

  'reverse' is used for the inverse relationship. For example, in 'ability_causes_status', we may either be interested in the ability or the status. 'reverse' being false means that we're interested in the owner, i.e. the ability, whereas 'reverse' being true means that we're interested in the owned entity, i.e. the status.
*/
const basicJunctionBatcherCount = ([pagination, filter, ownerEntityName, ownedEntityName, middle, reverse]) => {
  return async entityPKs => {
    // A trick so the code can handle both cases of 'reverse.'
    if (reverse) {
      [ownerEntityName, ownedEntityName] = [ownedEntityName, ownerEntityName]
    }

    // Compute table and column names for the owner and owned entities.
    const ownerTableName = entityNameToTableName(ownerEntityName);

    const ownedTableName = entityNameToTableName(ownedEntityName);
    const ownedID = ownedTableName + '_id';

    // Compute junction table name based on the owner and owned entity names, as well as 'middle'.
    const junctionTableName = computeJunctionTableName(ownerTableName, ownedTableName, middle, reverse);

    // May need to change column names when looking at the junction table, e.g. when owned and owner are the same type of entity, as in 'pmove_requires_pmove' (move requiring a move).
    let junctionOwnedID, junctionOwnedGen;
    switch (junctionTableName) {
      // 'base_pmove_generation_id'
      case 'pmove_requires_pmove':
        // 'owned' is the move being required, i.e. base move
        if(!reverse) {
          junctionOwnerID = 'requiring_pmove_id';
          junctionOwnerGen = 'requiring_pmove_generation_id';
          junctionOwnedID = 'required_pmove_id';
          junctionOwnedGen = 'required_pmove_generation_id';
        } 
        // 'owned' is the move doing the requiring 
        else {
          junctionOwnerID = 'required_pmove_id';
          junctionOwnerGen = 'required_pmove_generation_id';
          junctionOwnedID = 'requiring_pmove_id';
          junctionOwnedGen = 'requiring_pmove_generation_id';
        }
        break;
      case 'natural_gift':
        // 'owned' is the type
        if(!reverse) {
          junctionOwnerID = 'item_id';
          junctionOwnerGen = 'item_generation_id';
          junctionOwnedID = 'ptype_id';
          junctionOwnedGen = 'ptype_generation_id';
        }
        // 'owned' is the item
        else {
          junctionOwnerID = 'ptype_id';
          junctionOwnerGen = 'ptype_generation_id';
          junctionOwnedID = 'item_id';
          junctionOwnedGen = 'item_generation_id';
        }
        break;
      case 'weather_ball':
        // 'owned' is the type
        if(!reverse) {
          junctionOwnerID = 'field_state_id';
          junctionOwnerGen = 'field_state_generation_id';
          junctionOwnedID = 'ptype_id';
          junctionOwnedGen = 'ptype_generation_id';
        }
        // 'owned' is the item
        else {
          junctionOwnerID = 'ptype_id';
          junctionOwnerGen = 'ptype_generation_id';
          junctionOwnedID = 'field_state_id';
          junctionOwnedGen = 'field_state_generation_id';
        }
        break;
      case 'ptype_matchup':
        // 'owned' is the offensive type
        if(!reverse) {
          junctionOwnerID = 'attacking_ptype_id';
          junctionOwnerGen = 'attacking_ptype_generation_id';
          junctionOwnedID = 'defending_ptype_id';
          junctionOwnedGen = 'defending_ptype_generation_id';
        }
        // 'owned' is the defensive type
        else {
          junctionOwnerID = 'defending_ptype_id';
          junctionOwnerGen = 'defending_ptype_generation_id';
          junctionOwnedID = 'attacking_ptype_id';
          junctionOwnedGen = 'attacking_ptype_generation_id';
        }
        break;
      case 'pokemon_evolution':
        // 'owned' is the evolution
        if(!reverse) {
          junctionOwnerID = 'prevolution_id';
          junctionOwnerGen = 'prevolution_generation_id';
          junctionOwnedID = 'evolution_id';
          junctionOwnedGen = 'evolution_generation_id';
        }
        // 'owned' is the prevolution
        else {
          junctionOwnerID = 'evolution_id';
          junctionOwnerGen = 'evolution_generation_id';
          junctionOwnedID = 'prevolution_id';
          junctionOwnedGen = 'prevolution_generation_id';
        }
        break;
      case 'pokemon_form':
        // 'owned' is the alternate form
        if(!reverse) {
          junctionOwnerID = 'base_form_id';
          junctionOwnerGen = 'base_form_generation_id';
          junctionOwnedID = 'form_id';
          junctionOwnedGen = 'form_generation_id';
        }
        // 'owned' is the base form
        else {
          junctionOwnerID = 'form_id';
          junctionOwnerGen = 'form_generation_id';
          junctionOwnedID = 'base_form_id';
          junctionOwnedGen = 'base_form_generation_id';
        }
        break;
      default:
        junctionOwnerID = ownerTableName + '_id';
        junctionOwnerGen = ownerTableName + '_generation_id';
        junctionOwnedID = ownedTableName + '_id';
        junctionOwnedGen = ownedTableName + '_generation_id';
    }

    // Compute ON clause for the JOIN statement.
    const onString = hasGenID(ownedTableName) 
      ? `ON (${junctionTableName}.${junctionOwnedGen}, ${junctionTableName}.${junctionOwnedID}) = (${ownedTableName}.generation_id, ${ownedTableName}.${ownedID})`
      : `ON ${junctionTableName}.${junctionOwnedID} = ${ownedTableName}.${ownedID}`;

    // If the two entity tables are the same, then ambiguity will arise without the junction table name.
    const whereString = hasGenID(ownerTableName) 
      ? `WHERE (${junctionTableName}.${junctionOwnerGen}, ${junctionTableName}.${junctionOwnerID}) IN ?`
      : `WHERE (${junctionTableName}.${junctionOwnerID}) IN ?`

    // Filtering and pagination strings.
    const filterString = getFilterQueryString(filter, ownedTableName);
    const paginationString = getPaginationQueryString(pagination, junctionTableName);

    // Query the database.
    const data = await db.promise().query(
      `
        SELECT ${junctionOwnerGen}, ${junctionOwnerID}, COUNT(*) FROM ${junctionTableName} RIGHT JOIN ${ownedTableName} 
        ${onString}
        ${whereString}
        ${filterString}
        ${paginationString}
        GROUP BY ${junctionOwnerGen}, ${junctionOwnerID}
      `,
      [[entityPKs.map(d => {
        return hasGenID(ownerTableName) 
          ? [d.genID, d.entityID]
          : [d.entityID];
      })]]
    )
    .then( ([results, fields]) => {
      // console.log(`
      //   SELECT ${junctionOwnerGen}, ${junctionOwnerID}, COUNT(*) FROM ${junctionTableName} RIGHT JOIN ${ownedTableName} 
      //   ${onString}
      //   ${whereString}
      //   ${filterString}
      //   ${paginationString}
      //   GROUP BY ${junctionOwnerGen}, ${junctionOwnerID}
      // `)
      // console.log(entityPKs.map(d => {
      //   return isGenDependent(owner) 
      //     ? [d.genID, d.entityID]
      //     : [d.entityID];
      // }))
      // console.log(results);
      return results;
    })
    .catch(console.log);

    const batch =  entityPKs.map(entityPK => 
      data
      .filter(d => 
          d[junctionOwnerGen] === entityPK.genID 
          && d[junctionOwnerID] === entityPK.entityID
        )
      .map(d => d['COUNT(*)']))[0];
    
    return batch.length > 0 
      ? batch
      : [0];
  }
}

module.exports = {
  getPaginationQueryString,
  getFilterQueryString,

  batchGens,
  basicJunctionBatcher,
  basicJunctionBatcherCount,
}