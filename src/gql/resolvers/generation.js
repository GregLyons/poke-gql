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

// Import helpers
//#region

const {entityNameToTableName, basicEdge} = require('./helpers.js');

//#endregion

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
  // 'parent' = 'generation_id'
  return {
    edges: async (parent, args, context, info) => {
      return await context.loaders.generation[entityName].present(args.pagination).load(parent);
    },

    count: async (parent, args, context, info) => {
      const tableName = entityNameToTableName(entityName);
      const genDependent = !['effect', 'usage_method', 'version_group'].includes(tableName);
      const columnName = genDependent ? 'generation_id' : 'introduced'
      const whereString = genDependent 
        ? `WHERE generation_id = ${parent}`
        : `WHERE introduced <= ${parent}`;

      return await context.db.promise().query(
        `
          SELECT COUNT(${columnName}) FROM ${tableName}
          ${whereString}
        `
      )
      .then( ([results, fields]) => { return Object.values(results[0])[0] })
      .catch(console.log);
    },
  };
};

const debutConnection = entityName => {
  // 'parent' = 'generation_id'
  return {
    edges: async (parent, args, context, info) => {
      return await context.loaders.generation[entityName].introduced(args.pagination).load(parent);
    },

    count: async (parent, args, context, info) => {
      return await context.db.promise().query(
        `
          SELECT COUNT(introduced) FROM ${entityNameToTableName(entityName)}
          WHERE introduced = ${parent}
        `
      )
      .then( ([results, fields]) => { return Object.values(results[0])[0] })
      .catch(console.log);
    },
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