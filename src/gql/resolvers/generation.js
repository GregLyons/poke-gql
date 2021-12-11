/* 
  Resolvers for Generation.

  db is a mysql2 database instance. 

  The 'generation' table has columns:
    'generation_id' (PK), corresponding to number.
    'generation_code', corresponding to code.
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

const {
  entityNameToTableName,
  basicEdge
} = require('./helpers.js');

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
*/
//#region

const Generation = {
  abilities: parent => parent.generation_id,
  abilitiesIntroduced: parent => parent.generation_id,

  effects: parent => parent.generation_id,
  effectsIntroduced: parent => parent.generation_id,

  code: parent => parent.generation_code,

  number: parent => parent.generation_id,

  items: parent => parent.generation_id,
  itemsIntroduced: parent => parent.generation_id,
  
  moves: parent => parent.generation_id,
  movesIntroduced: parent => parent.generation_id,

  pokemon: parent => parent.generation_id,
  pokemonIntroduced: parent => parent.generation_id,

  types: parent => parent.generation_id,
  typesIntroduced: parent => parent.generation_id,

  usageMethods: parent => parent.generation_id,
  usageMethodsIntroduced: parent => parent.generation_id,

  versionGroups: parent => parent.generation_id,
  versionGroupsIntroduced: parent => parent.generation_id,
};

//#endregion

// Connections and edges
//#region

const presenceConnection = entityName => {
  // 'parent' = 'generation_id'
  return {
    edges: async (parent, args, context, info) => {
      return await context.loaders.generation[entityName].present(args.pagination).load(parent);
    },

    count: async (parent, args, context, info) => {
      const tableName = entityNameToTableName(entityName);
      const genDependent = !['version_group', 'sprite', 'pdescription', 'generation'].includes(tableName);
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