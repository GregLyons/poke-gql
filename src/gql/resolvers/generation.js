/* 
  Resolvers for Generation.

  db is a mysql2 database instance. 

  The 'generation' table has columns:
    'generation_id' (PK), corresponding to genNumber.
    'generation_code', corresponding to genCode.
*/


// Query
/*
    generationByID(id)
    generationByNumber(number)
    generationByCode(code)
    generations(cursor, limit)
*/
//#region

const Query = {
  generationByNumber: async (parent, args, context, info) => {
    const results = await context.db.promise().query(
      `
        SELECT * FROM generation
        WHERE generation_id = ${args.number}
      `
    )
    .catch(console.log)
    return results[0][0];
  },
  
  generationByCode: async (parent, args, context, info) => {
    args.code = args.code.toUpperCase();
  
    const results = await context.db.promise().query(
      `
        SELECT * FROM generation
        WHERE generation_code = '${args.code}'
      `
    )
    .catch(console.log)
  
    return results[0][0];
  },
  
  // TODO: cursor
  generations: async (parent, args, context, info) => {
    const results = await context.db.promise().query(
      `
        SELECT * FROM generation
      `
    )
    .catch(console.log)
  
    return results[0];
  },
}

//#endregion

// Generation
/*
    id
    abilities(input)
    genCode
    genNumber
    items(input)
    moves(input)
    pokemon(input)
    types(input)
*/
//#region

// Helper function which returns the generation_id of the parent.
const parentGenID = async (parent) => parent.generation_id;

const Generation = {
  abilities: async (parent) => parent.generation_id,

  genCode: async (parent, args, context, info) => {
    return parent.generation_code;
  },

  genNumber: async (parent) => parent.generation_id,

  items: async (parent) => parent.generation_id,
  
  moves: async (parent) => parent.generation_id,

  pokemon: async (parent) => parent.generation_id,

  types: async (parent) => parent.generation_id,
};

//#endregion

// Connections and edges
/*

*/
//#region

const presenceConnection = entityName => {
  return {
    // 'parent' = 'introduced'
    edges: async (parent, args, {loaders}, info) => {
      return await loaders.generation[entityName].present.load(parent);
    }
  };
}

const presenceEdge = () => {
  return {
    node: parent => parent,
  };
}

const ConnectionsAndEdges = {
  GenerationAbilityConnection: presenceConnection('ability'),
  GenerationAbilityEdge: presenceEdge(),

  GenerationItemConnection: presenceConnection('item'),
  GenerationItemEdge: presenceEdge(),

  GenerationMoveConnection: presenceConnection('move'),
  GenerationMoveEdge: presenceEdge(),

  GenerationPokemonConnection: presenceConnection('pokemon'),
  GenerationPokemonEdge: presenceEdge(),

  GenerationTypeConnection: presenceConnection('type'),
  GenerationTypeEdge: presenceEdge(),

}

//#endregion

module.exports = {
  Query,
  Generation,
  ...ConnectionsAndEdges,
}