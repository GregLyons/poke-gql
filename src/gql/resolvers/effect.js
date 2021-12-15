/* 
  Resolvers for Effect.

  db is a mysql2 database instance. 

  The 'effect' table has columns:
    'effect_id'
    'effect_name'
    'effect_formatted_name'
    'introduced'
*/

// Import helpers
//#region

const {
  queryEntities,
  queryEntityByColumn,

  parentPK,
  
  basicEdge,

  basicJunctionConnection,
  generationConnection,
  introductionConnection,
} = require('./helpers.js');
const effectPK = parentPK('effect');

//#endregion

// Query
/*
    effectByID(id)
    effectByName(name)
    effects(
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
  effectByName: queryEntityByColumn('effect', 'name'),

  effects: queryEntities('effect'),
}

//#endregion

// Effect
/*
    id
*/
//#region

const Effect = {
  abilities: effectPK,

  formattedName: parent => parent.effect_formatted_name,

  fieldStates: effectPK,

  generation: parent => parent.generation_id,
  
  introduced: parent => parent.introduced,
  
  name: parent => parent.effect_name,

  items: effectPK,

  moves: effectPK,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  EffectAbilityConnection: basicJunctionConnection('effect', 'ability'),
  EffectAbilityEdge: basicEdge(),

  EffectFieldStateConnection: basicJunctionConnection('effect', 'fieldState'),
  EffectFieldStateEdge: basicEdge(),
  
  EffectGenerationConnection: generationConnection('effect'),
  EffectGenerationEdge: basicEdge(),

  EffectIntroductionConnection: introductionConnection('effect'),
  EffectIntroductionEdge: basicEdge(),

  EffectItemConnection: basicJunctionConnection('effect', 'item'),
  EffectItemEdge: basicEdge(),

  EffectMoveConnection: basicJunctionConnection('effect', 'move'),
  EffectMoveEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Effect,
  ...ConnectionsAndEdges,
}