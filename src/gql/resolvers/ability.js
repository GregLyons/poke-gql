/* 
  Resolvers for Ability.

  db is a mysql2 database instance. 

  The 'ability' table has columns:
    'generation_id'
    'ability_id'
    'ability_name'
    'ability_formatted_name'
    'introduced'
*/

// Query
/*
    abilityByID(id)
    abilityByName(name)
    abilities(
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
  abilityByName: async (parent, { generation, name }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM ability
        WHERE generation_id = ${generation}
        AND ability_name = '${name.toLowerCase()}'
      `
    )
    .then( ([results, fields]) => {
      return results[0];
    })
    .catch(console.log);
  },

  // TODO: cursor
  abilities: async (parent, { generation }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM ability
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

// Ability
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

const formattedName = async (parent, args, context, info) => {
  return parent.ability_formatted_name;
}

const introduced = async (parent, args, context, info) => {
  return parent.introduced;
}

const name = async (parent, args, context, info) => {
  return parent.ability_name
}

const Ability = {
  formattedName,
  introduced,
  name,
}

//#endregion

// Connections and edges
/*

*/
//#region

const ConnectionsAndEdges = {
  AbilityGenerationConnection: {
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
  
  AbilityGenerationEdge: {
    node: async (parent, args, context, info) => {
      return parent;
    }
  },

}

//#endregion

module.exports = {
  Query,
  Ability,
  ...ConnectionsAndEdges,
}