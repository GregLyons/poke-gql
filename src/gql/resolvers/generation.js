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
    abilitiesIntroduced(input)
    effects(input)
    effectsIntroduced(input)
    genCode
    genNumber
    items(input)
    itemsIntroduced(input)
    moves(input)
    movesIntroduced(input)
    pokemon(input)
    pokemonIntroduced(input)
    types(input)
    typesIntroduced(input)
    usageMethods(input)
    usageMethodsIntroduced(input)
    versionGroups(input)
    versionGroupsIntroduced(input)
*/
//#region

// Helper function which returns the generation_id of the parent.
const parentGenID = parent => parent.generation_id;

const Generation = {
  abilities: parentGenID,
  abilitiesIntroduced: parentGenID,

  effects: parentGenID,
  effectsIntroduced: parentGenID,

  genCode: parent => parent.generation_code,

  genNumber: parentGenID,

  items: parentGenID,
  itemsIntroduced: parentGenID,
  
  moves: parentGenID,
  movesIntroduced: parentGenID,

  pokemon: parentGenID,
  pokemonIntroduced: parentGenID,

  types: parentGenID,
  typesIntroduced: parentGenID,

  usageMethods: parentGenID,
  usageMethodsIntroduced: parentGenID,

  versionGroups: parentGenID,
  versionGroupsIntroduced: parentGenID,
};

//#endregion

// Connections and edges
/*

*/
//#region

const presenceConnection = entityName => {
  return {
    // 'parent' = 'generation_id'
    edges: async (parent, args, {loaders}, info) => {
      return await loaders.generation[entityName].present.load(parent);
    }
  };
};

const debutConnection = entityName => {
  return {
    // 'parent' = 'generation_id'
    edges: async (parent, args, {loaders}, info) => {
      return await loaders.generation[entityName].introduced.load(parent);
    }
  };
};

const basicEdge = () => {
  return {
    node: parent => parent,
  };
};

// TODO: cursor
const ConnectionsAndEdges = {
  GenerationAbilityConnection: presenceConnection('ability'),
  GenerationIntroducedAbilityConnection: debutConnection('ability'),
  GenerationAbilityEdge: basicEdge(),

  GenerationEffectConnection: presenceConnection('effect'),
  GenerationIntroducedEffectConnection: debutConnection('effect'),
  GenerationEffectEdge: basicEdge(),

  GenerationItemConnection: presenceConnection('item'),
  GenerationIntroducedItemConnection: debutConnection('item'),
  GenerationItemEdge: basicEdge(),

  GenerationMoveConnection: presenceConnection('move'),
  GenerationIntroducedMoveConnection: debutConnection('move'),
  GenerationMoveEdge: basicEdge(),

  GenerationPokemonConnection: presenceConnection('pokemon'),
  GenerationIntroducedPokemonConnection: debutConnection('pokemon'),
  GenerationPokemonEdge: basicEdge(),

  GenerationTypeConnection: presenceConnection('type'),
  GenerationIntroducedTypeConnection: debutConnection('type'),
  GenerationTypeEdge: basicEdge(),

  GenerationUsageMethodConnection: presenceConnection('usageMethod'),
  GenerationIntroducedUsageMethodConnection: debutConnection('usageMethod'),
  GenerationUsageMethodEdge: basicEdge(),

  GenerationVersionGroupConnection: presenceConnection('versionGroup'),
  GenerationIntroducedVersionGroupConnection: debutConnection('versionGroup'),
  GenerationVersionGroupEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Generation,
  ...ConnectionsAndEdges,
}