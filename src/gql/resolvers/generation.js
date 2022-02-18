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
  queryEntities,
  
  basicEdge,
  queryEntitiesByColumn,

  debutConnection,
  presenceConnection,
  topLevelConnection,

  topLevelBulkQuery,
} = require('./helpers.js');

//#endregion

const Query = {
  generationByNumber: queryEntitiesByColumn('generation', 'number'),
  
  generationByCode: queryEntitiesByColumn('generation', 'code'),
  
  generations: topLevelBulkQuery('generation'),
}

//#endregion

// Generation
//#region

const Generation = {
  // 
  id: parent => parent.generation_id,

  abilities: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
  abilitiesIntroduced: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },

  code: parent => parent.generation_code,

  effects: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
  effectsIntroduced: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },

  fieldStates: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
  fieldStatesIntroduced: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
  
  items: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
  itemsIntroduced: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
  
  moves: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
  movesIntroduced: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
  
  number: parent => parent.generation_id,

  pokemon: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
  pokemonIntroduced: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },

  stats: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
  statsIntroduced: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },

  statuses: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
  statusesIntroduced: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },

  types: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
  typesIntroduced: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },

  usageMethods: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
  usageMethodsIntroduced: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },

  versionGroups: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
  versionGroupsIntroduced: async (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      filter: args.filter,
    }
  },
};

//#endregion

// Connections and edges
//#region

// TODO: cursor
const ConnectionsAndEdges = {
  GenerationConnection: topLevelConnection('generation'),
  GenerationEdge: basicEdge(),

  GenerationAbilityConnection: presenceConnection('ability'),
  GenerationIntroducedAbilityConnection: debutConnection('ability'),
  GenerationAbilityEdge: basicEdge(),

  GenerationEffectConnection: presenceConnection('effect'),
  GenerationIntroducedEffectConnection: debutConnection('effect'),
  GenerationEffectEdge: basicEdge(),

  GenerationFieldStateConnection: presenceConnection('fieldState'),
  GenerationIntroducedFieldStateConnection: debutConnection('fieldState'),
  GenerationFieldStateEdge: basicEdge(),

  GenerationItemConnection: presenceConnection('item'),
  GenerationIntroducedItemConnection: debutConnection('item'),
  GenerationItemEdge: basicEdge(),

  GenerationMoveConnection: presenceConnection('move'),
  GenerationIntroducedMoveConnection: debutConnection('move'),
  GenerationMoveEdge: basicEdge(),

  GenerationPokemonConnection: presenceConnection('pokemon'),
  GenerationIntroducedPokemonConnection: debutConnection('pokemon'),
  GenerationPokemonEdge: basicEdge(),

  GenerationStatConnection: presenceConnection('stat'),
  GenerationIntroducedStatConnection: debutConnection('stat'),
  GenerationStatEdge: basicEdge(),

  GenerationStatusConnection: presenceConnection('status'),
  GenerationIntroducedStatusConnection: debutConnection('status'),
  GenerationStatusEdge: basicEdge(),

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