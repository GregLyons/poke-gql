/* 
  Resolvers for Item.

  db is a mysql2 database instance. 

  The 'item' table has columns:
    'generation_id'
    'item_id'
    'item_name'
    'item_formatted_name'
    'introduced'
*/

// Query
/*
    itemByID(id)
    itemByName(name)
    items(
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
  itemByName: async (parent, { generation, name }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM item
        WHERE generation_id = ${generation}
        AND item_name = '${name.toLowerCase()}'
      `
    )
    .then( ([results, fields]) => {
      return results[0];
    })
    .catch(console.log);
  },

  // TODO: cursor
  items: async (parent, { generation }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM item
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

// Item
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

const Item = {
  formattedName: async (parent, args, context, info) => {
    return parent.item_formatted_name;
  },
  
  introduced: async (parent, args, context, info) => {
    return parent.introduced;
  },
  
  name: async (parent, args, context, info) => {
    return parent.item_name
  },
}

//#endregion

// Connections and edges
/*

*/
//#region

const ConnectionsAndEdges = {
  ItemGenerationConnection: {
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
  
  ItemGenerationEdge: {
    node: async (parent, args, context, info) => {
      return parent;
    }
  },

}

//#endregion

module.exports = {
  Query,
  Item,
  ...ConnectionsAndEdges,
}