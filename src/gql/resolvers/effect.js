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
  queryEntitiesByColumn,

  basicEdge,
  
  junctionConnection,
  generationConnection,
  introductionConnection,

  parentPK,
  parentPKDebut,
  primaryKeyToID,
} = require('./helpers.js');
const effectPK = parentPK('effect')
const effectPKDebut = parentPKDebut('effect');
const getID = primaryKeyToID('effect');

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
  effectByName: queryEntitiesByColumn('effect', 'name'),

  effectsByName: queryEntitiesByColumn('effect', 'names'),

  effects: queryEntities('effect'),
}

//#endregion

// Effect
//#region

const Effect = {
  id: getID,

  abilities: effectPK,

  description: parent => parent.effect_description,

  formattedName: parent => parent.effect_formatted_name,

  fieldStates: effectPK,

  generation: effectPK,
  
  introduced: effectPKDebut,
  
  name: parent => parent.effect_name,

  items: effectPK,

  moves: effectPK,
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  EffectAbilityConnection: junctionConnection('effect', 'ability'),
  EffectAbilityEdge: basicEdge(),

  EffectFieldStateConnection: junctionConnection('effect', 'fieldState'),
  EffectFieldStateEdge: basicEdge(),
  
  EffectGenerationConnection: generationConnection('effect'),
  EffectGenerationEdge: basicEdge(),

  EffectIntroductionConnection: introductionConnection('effect'),
  EffectIntroductionEdge: basicEdge(),

  EffectItemConnection: junctionConnection('effect', 'item'),
  EffectItemEdge: basicEdge(),

  EffectMoveConnection: junctionConnection('effect', 'move'),
  EffectMoveEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  Effect,
  ...ConnectionsAndEdges,
}