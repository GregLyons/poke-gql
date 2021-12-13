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
  parentPK,

  basicEdge,

  introductionConnection,
} = require('./helpers.js');
const versionGroupPK = parentPK('versionGroup');
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
  versionGroupByName: async (parent, { name }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM version_group
        WHERE version_group_name = '${name.toLowerCase()}'
      `
    )
    .then( ([results, fields]) => {
      return results[0];
    })
    .catch(console.log);
  },

  // TODO: cursor
  versionGroups: async (parent, { generation }, context, info) => {
    return await context.db.promise().query(
      `
        SELECT * FROM version_group
      `
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);
  },
}

//#endregion

// VersionGroup
/*
    id
    descriptions
    sprites
*/
//#region

const VersionGroup = {
  code: async (parent, args, context, info) => {
    return parent.version_group_code
  },

  formattedName: async (parent, args, context, info) => {
    return parent.version_group_formatted_name;
  },
  
  introduced: async (parent, args, context, info) => {
    return parent.introduced;
  },
 
}

//#endregion

// Connections and edges
//#region

const ConnectionsAndEdges = {
  VersionGroupIntroductionConnection: introductionConnection('versionGroup'),
  VersionGroupIntroductionEdge: basicEdge(),
}

//#endregion

module.exports = {
  Query,
  VersionGroup,
  ...ConnectionsAndEdges,
}