/* 
  Resolvers for Move.

  db is a mysql2 database instance. 

  The 'move' table has columns:
    'generation_id'
    'move_id'
    'move_name'
    'move_formatted_name'
    'introduced'
*/

// Query
/*
    moveByID(id)
    moveByName(name)
    moves(
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
  moveByName: async (parent, { generation, name }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM pmove
        WHERE generation_id = ${generation}
        AND pmove_name = '${name.toLowerCase()}'
      `
    )
    .then( ([results, fields]) => {
      return results[0];
    })
    .catch(console.log);
  },

  // TODO: cursor
  moves: async (parent, { generation }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM pmove
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

// Move
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

const Move = {
  formattedName: async (parent, args, context, info) => {
    return parent.pmove_formatted_name;
  },
  
  introduced: async (parent, args, context, info) => {
    return parent.introduced;
  },
  
  name: async (parent, args, context, info) => {
    return parent.pmove_name
  },
}

//#endregion

// Connections and edges
/*

*/
//#region

const ConnectionsAndEdges = {
  MoveGenerationConnection: {
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
  
  MoveGenerationEdge: {
    node: async (parent, args, context, info) => {
      return parent;
    }
  },

}

//#endregion

module.exports = {
  Query,
  Move,
  ...ConnectionsAndEdges,
}