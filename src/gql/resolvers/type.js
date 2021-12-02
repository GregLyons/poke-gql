/* 
  Resolvers for Type.

  db is a mysql2 database instance. 

  The 'type' table has columns:
    'generation_id'
    'type_id'
    'type_name'
    'type_formatted_name'
    'introduced'
*/

// Query
/*
    typeByID(id)
    typeByName(name)
    types(
      cursor,
      limit,
      generation,
      contains,
      endsWith,
      introducedAfter,
      introducedBefore,
      startsWith
    )
*/
//#region

const Query = {
  typeByName: async (parent, { generation, name }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM ptype
        WHERE generation_id = ${generation}
        AND ptype_name = '${name.toLowerCase()}'
      `
    )
    .then( ([results, fields]) => {
      return results[0];
    })
    .catch(console.log);
  },

  // TODO: cursor
  types: async (parent, { generation }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM ptype
        WHERE generation_id = ${generation}
      `
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);
  },
}

//#endregion

// Type
/*
    id
    boostsType(input)
    boostsUsageMethod(input)
    causesStatus(input)
    descriptions(input)
    effect(input)
    formattedName
    introduced(input)
    modifiesStat(input)
    name
    resistsType(input)
    resistsUsageMethod(input)
    resistsStatus(input)
*/
//#region

const Type = {
  formattedName: async (parent, args, context, info) => {
    return parent.ptype_formatted_name;
  },
  
  introduced: async (parent, args, context, info) => {
    return parent.introduced;
  },
  
  name: async (parent, args, context, info) => {
    return parent.ptype_name
  },
}

//#endregion

// Connections and edges
/*

*/
//#region

const ConnectionsAndEdges = {
  TypeGenerationConnection: {
    // 'parent' = 'introduced'
    edges: async (parent, args, context, info) => {
      return await context.db.promise().query(
        `
          SELECT * FROM generation
          WHERE generation_id = ${parent}
        `
      )
      .then( ([results, fields]) => {
        return results;
      })
      .catch();
    }
  },
  
  TypeGenerationEdge: {
    node: async (parent, args, context, info) => {
      return parent;
    }
  },

}

//#endregion

module.exports = {
  Query,
  Type,
  ...ConnectionsAndEdges,
}