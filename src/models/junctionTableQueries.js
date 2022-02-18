const {
  entityNameToTableName,
  escapeObjectParameters,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
} = require('./helpers.js');

const getForeignKeyColumnNames = (junctionTableName, ownerTableName, ownedTableName) => {
  let junctionOwnedID,
      junctionOwnedGen,
      junctionOwnerID,
      junctionOwnerGen;
  
  switch (junctionTableName) {
    // 'base_pmove_generation_id'
    case 'pmove_requires_pmove':
      // 'owned' is the move being required
      junctionOwnerID = 'requiring_pmove_id';
      junctionOwnerGen = 'requiring_pmove_generation_id';
      junctionOwnedID = 'required_pmove_id';
      junctionOwnedGen = 'required_pmove_generation_id';
      break;

    case 'pmove_interacts_pmove':
      // 'owned' is the move being interacted with (e.g. 'snatch', 'protect', 'assist')
      junctionOwnerID = 'interacting_pmove_id';
      junctionOwnerGen = 'interacting_pmove_generation_id';
      junctionOwnedID = 'recipient_pmove_id';
      junctionOwnedGen = 'recipient_pmove_generation_id';
      break;

    case 'natural_gift':
      // 'owned' is the type
      junctionOwnerID = 'item_id';
      junctionOwnerGen = 'item_generation_id';
      junctionOwnedID = 'ptype_id';
      junctionOwnedGen = 'ptype_generation_id';
      break;

    case 'weather_ball':
      // 'owned' is the type
      junctionOwnerID = 'field_state_id';
      junctionOwnerGen = 'field_state_generation_id';
      junctionOwnedID = 'ptype_id';
      junctionOwnedGen = 'ptype_generation_id';
      break;

    case 'ptype_matchup':
      // 'owned' is the offensive type
      junctionOwnerID = 'attacking_ptype_id';
      junctionOwnerGen = 'attacking_ptype_generation_id';
      junctionOwnedID = 'defending_ptype_id';
      junctionOwnedGen = 'defending_ptype_generation_id';
      break;

    case 'pokemon_evolution':
      // 'owned' is the evolution
      junctionOwnerID = 'prevolution_id';
      junctionOwnerGen = 'prevolution_generation_id';
      junctionOwnedID = 'evolution_id';
      junctionOwnedGen = 'evolution_generation_id';
      break;

    case 'pokemon_form':
      // 'owned' is the alternate form
      junctionOwnerID = 'base_form_id';
      junctionOwnerGen = 'base_form_generation_id';
      junctionOwnedID = 'form_id';
      junctionOwnedGen = 'form_generation_id';
      break;

    default:
      junctionOwnerID = ownerTableName + '_id';
      junctionOwnerGen = ownerTableName + '_generation_id';
      junctionOwnedID = ownedTableName + '_id';
      junctionOwnedGen = ownedTableName + '_generation_id';
  }

  // if (reverse) {
  //   [junctionOwnerGen, junctionOwnerID, junctionOwnedGen, junctionOwnedID] = [junctionOwnedGen, junctionOwnedID, junctionOwnerGen, junctionOwnerID];
  // }

  return {
    junctionOwnerGen,
    junctionOwnerID,
    junctionOwnedGen,
    junctionOwnedID,
  };
}

// Compute the query string given pagination and filter information, the names of the entities, and other data.
/*
  'ownerEntityName' and 'ownedEntityName' refer to the order of the entity table names in the relevant junction table name. For example, in 'pokemon_ability', the owning entity is the Pokemon, and the owned entity is the Ability. 

  'middle' is an additional string used to help find the correct junction table.

  'reverse' is a Boolean. If it is false, then the GraphQL edge direction matches the owner-owned relationship in the database. If instead 'reverse' is true, then the edge direction opposes the owner-owned relationship in the database. 
  
  For example, for an edge from a Pokemon Node to an Ability Node, the edge direction matches the ownership relationship, represented by 'pokemon_ability'. For an edge from an Ability Node to a Pokemon Node, then the ending Pokemon Node is the owner in the relationship, rather than the starting Ability Node.

  For another example, consider the 'enablesMove' and 'requiresMove' fields for a Move Node. The relevant junction table is 'pmove_requires_pmove', so the 'owned' is the base Move, and the 'owner' is the Move requiring the base Move. Thus, the edge direction for 'requiresMove' matches the owner-owned relationship, whereas the edge direction for 'enablesMove' opposes the owner-owned relationship.
*/
const computeJunctionTableQueryString = (
  [
    pagination,
    filter,
    ownerEntityName,
    ownedEntityName,
    junctionTableName,
    reverse
  ],
  countMode,
  batching = false
) => {
  // Escape object parameters that are strings.
  escapeObjectParameters(pagination);
  escapeObjectParameters(filter);

  // Compute the table names and id columns for the owning and owned tables, and then compute the starting and ending table names and id columns according to 'reverse'.
  //#region

  // Compute table and column names for the owner and owned entities.
  const ownerTableName = entityNameToTableName(ownerEntityName);
  const ownerID = ownerTableName + '_id';

  const ownedTableName = entityNameToTableName(ownedEntityName);
  const ownedID = ownedTableName + '_id';


  // Determine the start and ending entity types for the edge, based on 'reverse'.
  let startTableName, 
      startID,
      endTableName, 
      endID;
  // GraphQL edge direction opposes ownership relationship.
  if (reverse) {
    [
      startTableName,
      startID,
      endTableName,
      endID,
    ] = [
      ownedTableName,
      ownedID,
      ownerTableName,
      ownerID,
    ];
  } 
  // GraphQL edge direction matches ownership relationship.
  else {
    [
      startTableName,
      startID,
      endTableName,
      endID,
    ] = [
      ownerTableName,
      ownerID,
      ownedTableName,
      ownedID,
    ];
  }

  //#endregion


  // Compute the names of the foreign key columns in the junction table.
  //#region
  
  // Get foreign key column names from junction table.
  const {
    junctionOwnerGen,
    junctionOwnerID,
    junctionOwnedGen,
    junctionOwnedID,
  } = getForeignKeyColumnNames(junctionTableName, ownerTableName, ownedTableName);
  
  let junctionStartGen,
      junctionStartID,
      junctionEndGen,
      junctionEndID;
  // Edge direction opposes ownership relation.
  if (reverse) {
    [
      junctionStartGen,
      junctionStartID,
      junctionEndGen,
      junctionEndID,
    ] = [
      junctionOwnedGen,
      junctionOwnedID,
      junctionOwnerGen,
      junctionOwnerID,
    ];
  // Edge direction matches ownership relation.
  } else {
    [
      junctionStartGen,
      junctionStartID,
      junctionEndGen,
      junctionEndID,
    ] = [
      junctionOwnerGen,
      junctionOwnerID,
      junctionOwnedGen,
      junctionOwnedID,
    ];
  }

  //#endregion


  // Compute clauses for the query.
  /*
    For the code below, keep in mind that:

      onString: We want data on the ending Nodes.

      whereString: We want to select only those rows from the junction table which correspond to the starting Node.

      filterString: Any additional filtering is based on the ending Nodes.

      paginationString: Only the junction table itself is relevant for pagination (limit, offset, sorting, ordering).
  */
  //#region

  const onString = hasGenID(endTableName) 
    ? `ON (${junctionTableName}.${junctionEndGen}, ${junctionTableName}.${junctionEndID}) = (${endTableName}.generation_id, ${endTableName}.${endID})`
    : `ON ${junctionTableName}.${junctionEndID} = ${endTableName}.${endID}`;

  // '?' will be filled in with primary keys from the owner table when batching.
  const whereString = hasGenID(startTableName) 
    ? `WHERE (${junctionTableName}.${junctionStartGen}, ${junctionTableName}.${junctionStartID}) IN ?`
    : `WHERE (${junctionTableName}.${junctionStartID}) IN ?`

  const filterString = getFilterQueryString(filter, endTableName);

  const paginationString = countMode 
    ? `` 
    : getPaginationQueryString(pagination, endTableName, batching);

  //#endregion

  // Compute columns to be selected, and if countMode, which columns to group by.
  //#region

  const selectColumns = countMode 
    ? hasGenID(startTableName)
      ? `${junctionStartGen}, ${junctionStartID}, COUNT(*) AS row_count`
      : `${junctionStartID}, COUNT(*) AS row_count`
    : `*`;

  const groupByString = countMode 
    ? hasGenID(startTableName)
      ? `GROUP BY ${junctionStartGen}, ${junctionStartID}`
      : `GROUP BY ${junctionStartID}`
    : ``;

  //#endregion

  // Finally, compute the query.
  const queryString = `
    SELECT ${selectColumns} FROM ${junctionTableName} RIGHT JOIN ${endTableName} 
    ${onString}
    ${whereString}
    ${filterString}
    ${paginationString}
    ${groupByString}
  `

  return {startTableName, junctionStartGen, junctionStartID, queryString}
}

module.exports = {
  computeJunctionTableQueryString,
}