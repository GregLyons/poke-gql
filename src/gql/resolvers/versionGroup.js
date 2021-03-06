/* 
  Resolvers for VersionGroup.

  db is a mysql2 database instance. 

  The 'version_group' table has columns:
    'version_group_id'
    'version_group_name'
    'version_group_formatted_name'
    'introduced'
*/

// Import helpers
//#region

const {
  queryEntities,
  queryEntitiesByColumn,
  
  basicEdge,
  
  introductionConnection,
  junctionConnection,
  topLevelConnection,

  parentPK,
  parentPKDebut,
  primaryKeyToID,
  topLevelBulkQuery,
} = require('./helpers.js');
const versionGroupPK = parentPK('versionGroup')
const versionGroupPKDebut = parentPKDebut('versionGroup');
const getID = primaryKeyToID('versionGroup');

//#endregion

// Query
/*
    versionGroupByID(id)
    versionGroupByName(name)
    versionGroups(
      cursor,
      limit,
      introducedAfter,
      introducedBefore
    )
*/
//#region

const Query = {
  versionGroupByCode: queryEntitiesByColumn('versionGroup', 'code'),

  versionGroupByName: queryEntitiesByColumn('versionGroup', 'name'),

  versionGroupsByName: queryEntitiesByColumn('versionGroup', 'names'),

  versionGroups: topLevelBulkQuery('versionGroup'),
}

//#endregion

// VersionGroup
//#region

const VersionGroup = {
  id: getID,

  code: parent => parent.version_group_code,

  descriptions: versionGroupPK,

  formattedName: parent => parent.version_group_formatted_name,

  introduced: versionGroupPKDebut,
  
  name: parent => parent.version_group_name,
 
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  VersionGroupConnection: topLevelConnection('versionGroup'),
  VersionGroupEdge: basicEdge(),

  VersionGroupIntroductionConnection: introductionConnection('versionGroup'),
  VersionGroupIntroductionEdge: basicEdge(),

  VersionGroupDescriptionConnection: junctionConnection('versionGroup', 'description'),
  VersionGroupDescriptionEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  VersionGroup,
  ...ConnectionsAndEdges,
}