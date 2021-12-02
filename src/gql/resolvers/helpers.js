const entityNameToTableName = entityName => {
  switch(entityName) {
    case 'usageMethod':
      return 'usage_method';
    case 'versionGroup':
      return 'version_group';
    case 'type':
      return 'ptype';
    case 'move':
      return 'pmove';
    case 'status':
      return 'pstatus';
    case 'description':
      return 'pdescription';
    case 'generation':
    case 'sprite':
    case 'ability':
    case 'item':
    case 'effect':
    case 'pokemon':
    case 'stat':
      return entityName;
    default:
      throw `Invalid entity name: ${entityName}.`;
  }
}


// Returns the generation_id of the parent.
const parentGenID = parent => parent.generation_id;

// Returns the primary key of the parent. 
const parentPK = (entityName) => {
  const idColumn = entityNameToTableName(entityName) + '_id';
  return parent => {
    return {
      genID: parent.generation_id,
      entityID: parent[idColumn],
    }
  };
}  

const basicEdge = () => {
  return {
    node: parent => parent,
  };
};

const introductionConnection = entityName => {
  // 'parent' = 'introduced'
  return {
    edges: async (parent, args, context, info) => {
      return await context.loaders[entityName].introduced(args.pagination).load(parent);
    },

    count: async (parent, args, context, info) => {
      return await context.db.promise().query(
        `
          SELECT COUNT(*) FROM 'generation'
          WHERE generation_id = ${parent}
        `
      )
      .then( ([results, fields]) => { return Object.values(results[0])[0] })
      .catch(console.log);
    },
  }
}

const basicJunctionConnection = (ownerName, ownedName) => {
  const ownerTableName = entityNameToTableName(ownerName);
  const ownedTableName = entityNameToTableName(ownedName);

  return {
    edges: async (parent, args, context, info) => {
      return await context.loaders[ownerName][ownedName](args.pagination).load(parent);
    },

    count: async (parent, args, context, info) => {
      return 'yo';
    },
  }
};

module.exports = {
  entityNameToTableName,
  
  basicEdge,
  introductionConnection,
  basicJunctionConnection,
  parentGenID,
  parentPK,
}