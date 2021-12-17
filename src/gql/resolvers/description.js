/* 
  Resolvers for Description.

  db is a mysql2 database instance. 

  The 'pdescription' table has columns:
    'pdescription_id'
    'pdescription_text'
    'pdescription_index'
    'pdescription_entity_class'
    'pdescription_entity_name'
    'introduced'

  'pdescription_index' doesn't contain any useful information for the purposes of the API, so we don't write a resolver for it.
*/

// Import helpers
//#region

const {
  queryEntities,
  queryEntitiesByColumn,

  parentPK,

  basicEdge,

  basicJunctionConnection,
} = require('./helpers.js');
const descriptionPK = parentPK('description');

//#endregion

// Query
/*
    DescriptionByID(id)
    DescriptionByEntityName(name)
    Descriptions(
      cursor,
      limit,
      introducedAfter,
      introducedBefore
    )
*/
//#region

const Query = {
  descriptionsByEntityName: queryEntitiesByColumn('description', 'entity_name'),

  descriptionsByEntityClass: queryEntitiesByColumn('description', 'entity_class'),

  descriptions: queryEntities('description'),
}

//#endregion

// VersionGroup
/*
    id
    descriptions
    sprites
*/
//#region

const Description = {

  entity: descriptionPK,

  // 
  entityClass: parent => parent.pdescription_entity_class.toUpperCase(),

  entityName: parent => parent.pdescription_entity_name,

  text: parent => parent.pdescription_text,

  versionGroups: descriptionPK,
 
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  DescriptionEntityConnection: {
    __resolveType(parent, context, info) {
      switch(parent.pdescription_entity_class) {
        case 'ability':
          return 'DescriptionAbilityConnection';
        case 'item':
          return 'DescriptionItemConnection';
        case 'move':
          return 'DescriptionMoveConnection';
        default:
          `Invalid entity class: ${parent.pdescription_entity_class}`;
          return null;
      }
    }
  },

  DescriptionVersionGroupConnection: basicJunctionConnection('description', 'versionGroup'),
  DescriptionVersionGroupEdge: basicEdge(),
  
}

//#endregion

module.exports = {
  Query,
  Description,
  ...ConnectionsAndEdges,
}