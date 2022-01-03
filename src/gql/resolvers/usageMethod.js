/* 
  Resolvers for UsageMethod.

  db is a mysql2 database instance. 

  The 'usage_method' table has columns:
    'usage_method_id'
    'usage_method_name'
    'usage_method_formatted_name'
    'introduced'
*/

// Import helpers
//#region

const {
  queryEntities,
  queryEntitiesByColumn,
  
  basicEdge,
  multiplierEdge,
  
  junctionConnection,
  generationConnection,
  introductionConnection,

  parentPK,
  primaryKeyToID,
} = require('./helpers.js');
const usageMethodPK = parentPK('usageMethod');
const getID = primaryKeyToID('usageMethod');

//#endregion

// Query
/*
    usageMethodByID(id)
    usageMethodByName(name)
    usageMethods(
      cursor,
      limit,
      contains,
      endsWith,
      introducedAfter,
      introducedBefore,
      startsWith
    )
*/
//#region

const Query = {
  usageMethodByName: queryEntitiesByColumn('usageMethod', 'name'),

  usageMethodsByName: queryEntitiesByColumn('usageMethod', 'names'),

  usageMethods: queryEntities('usageMethod'),
}

//#endregion

// UsageMethod
//#region

const UsageMethod = {
  id: getID,

  boostedByAbility: usageMethodPK,

  boostedByItem: usageMethodPK,
  
  formattedName: parent => parent.usage_method_formatted_name,
  
  generation: parent => parent.generation_id,
  
  introduced: parent => parent.introduced,

  resistedByAbility: usageMethodPK,
  
  resistedByItem: usageMethodPK,

  moves: usageMethodPK,
  
  name: parent => parent.usage_method_name,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  UsageMethodBoostedByAbilityConnection: junctionConnection('usageMethod', 'boostedByAbility'),
  UsageMethodBoostedByAbilityEdge: multiplierEdge(),

  UsageMethodBoostedByItemConnection: junctionConnection('usageMethod', 'boostedByItem'),
  UsageMethodBoostedByItemEdge: multiplierEdge(),

  UsageMethodGenerationConnection: generationConnection('usageMethod'),
  UsageMethodGenerationEdge: basicEdge(),

  UsageMethodIntroductionConnection: introductionConnection('usageMethod'),
  UsageMethodIntroductionEdge: basicEdge(),

  UsageMethodMoveConnection: junctionConnection('usageMethod', 'move'),
  UsageMethodMoveEdge: basicEdge(),
  
  UsageMethodResistedByAbilityConnection: junctionConnection('usageMethod', 'resistedByAbility'),
  UsageMethodResistedByAbilityEdge: multiplierEdge(),

  UsageMethodResistedByItemConnection: junctionConnection('usageMethod', 'resistedByItem'),
  UsageMethodResistedByItemEdge: multiplierEdge(),
}

//#endregion

module.exports = {
  Query,
  UsageMethod,
  ...ConnectionsAndEdges,
}