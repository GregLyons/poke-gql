const {
  entityNameToTableName,
  getEntityQueryString,
  getEntityByColumnQueryString,
} = require('../../models/index.js');

// Resolving top-level Queries
//#region

// For bulk Queries (e.g. 'abilities { ... }', 'moves { ... }')
const queryEntities = entityName => {
  return async (parent, args, context, info) => {
    Object.keys(context.loaders).map(entityName => context.loaders[entityName].clearLoaders());

    if (!args.generations) {
      args.generations = [args.generation];
    }

    return await context.db.promise().query(
      getEntityQueryString(entityName, args.pagination, args.filter),
      [[args.generations]]
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);
  }
}

// For more specific Queries (e.g. 'abilityByName (name: ...) { ... }')
const queryEntitiesByColumn = (entityName, keyName) => {
  return async (parent, args, context, info) => {
    Object.keys(context.loaders).map(entityName => context.loaders[entityName].clearLoaders());

    if (!args.generations) {
      args.generations = [args.generation];
    }

    return await context.db.promise().query(
      getEntityByColumnQueryString(entityName, keyName, args[keyName]),
      [[args.generations]]
    )
    .then( ([results, fields]) => {
      return results;
    })
    .catch(console.log);
  }
}

//#endregion

// Common resolver patterns
//#region

// Returns the primary key of the parent. 
const parentPK = (entityName) => {
  const idColumn = entityNameToTableName(entityName) + '_id';
  return (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      entityID: parent[idColumn],
      filter: args.filter,
    }
  };
};

// Returns the primary key of the parent. 
const parentPKDebut = (entityName) => {
  const idColumn = entityNameToTableName(entityName) + '_id';
  return (parent, args, context, info) => {
    return {
      genID: parent.generation_id,
      entityID: parent[idColumn],
      introduced: parent.introduced,
      filter: args.filter,
    }
  };
};

// Returns an ID string for the entity. This string consists either solely of the value of the AUTO_INCREMENT column for the entity, or, if the entity is generation-dependent, the generation number followed by a '_', followed by the AUTO_INCREMENT column value.
const primaryKeyToID = (entityClass) => {
  const idColumn = entityNameToTableName(entityClass) + '_id';

  return (parent, args, context, info) => {
    if (parent.generation_id) return parent.generation_id + '_' + parent[idColumn];
    else return parent[idColumn];
  }
}

//#endregion

// Edge patterns
//#region

// Ability slot.
const abilityEdge = () => {
  return {
    node: parent => parent,
    slot: parent => {
      const abilitySlot = parent.ability_slot;
      switch(abilitySlot) {
        case '1':
          return 'ONE';
        case '2':
          return 'TWO';
        case 'hidden':
          return 'HIDDEN';
        default:
          return;
      }
    }
  }
}

// Basic edge where only parent is needed.
const basicEdge = () => {
  return {
    // node: parent => parent,
    node: parent => {
      return parent
    },
  };
};

// Chance of causing status.
const causeStatusEdge = () => {
  return {
    node: parent => parent,
    chance: parent => parent.chance,
  }
}

const descriptionEdge = () => {
  return {
    node: parent => parent,
    versionGroupCode: parent => parent.version_group_code,
  }
}

// Evolution method.
const evolutionEdge = () => {
  return {
    node: parent => parent,
    method: parent => parent.evolution_method,
  }
}

// Class of Pokemon form.
const formEdge = () => {
  return {
    node: parent => parent,
    class: parent => parent.form_class.toUpperCase(),
  }
}

// Method of learning move.
const learnsetEdge = () => {
  return {
    node: parent => parent,
    learnMethod: parent => parent.learn_method,
  }
}

// Edge for stat modification.
const modifyStatEdge = () => {
  return {
    node: parent => parent,

    // Chance of stat modification occurring, assuming necessary conditions are met.
    chance: parent => parent.chance,

    // Factor by which a stat is scaled, for e.g. Adaptability. 
    multiplier: parent => parent.multiplier,

    // Recipient of the stat modification, e.g. user/owner of the Move/Ability, or the target of the Move/Ability (e.g. a Pokemon who attacks another Pokemon with the 'Gooey' Ability is the 'target' of Gooey).
    recipient: parent => parent.recipient.toUpperCase(),

    // Number of stages by which a stat is lowered or raised, e.g. for Initimidate.
    stage: parent => parent.stage,
  }
}

// Edge for modifications which act via multipliers, e.g. 'Normalize' boosting the power of Normal-Type Moves by a specific factor.
const multiplierEdge = () => {
  return {
    node: parent => parent,
    multiplier: parent => parent.multiplier,
  }
}

// Edge for power of the Move Natural Gift.
const powerEdge = () => {
  return {
    node: parent => parent,
    power: parent => parent.power,
  }
}

// Edge for turns a FieldState is created.
const turnsEdge = () => {
  return {
    node: parent => parent,
    turns: parent => parent.turns,
  }
}

//#endregion

// Connection patterns
//#region

// Connection from a non-Generation entity to a Generation, signifying that the entity is present in that Generation.
// No 'count' field since it is always 1.
const generationConnection = entityClass => {
  // 'parent' = 'generation'
  return {
    id: (parent, args, context, info) => {
      if (parent.genID) return [parent.genID, parent.entityID, entityClass, 'generation'].join('_')
      else return [parent.entityID, 'generation'].join('_');
    },
    
    edges: async (parent, args, context, info) => {
      return await context.loaders[entityClass].load('generation', parent, args.pagination, parent.filter, false)
    },
  };
}

// Connection from a non-Generation entity to a Generation, signifying that the entity was introduced in that Generation.
// No 'count' field since it is always 1.
const introductionConnection = entityClass => {
  // 'parent' = 'introduced'
  return {
    id: (parent, args, context, info) => {
      if (parent.genID) return [parent.genID, parent.entityID, entityClass, 'introduction'].join('_')
      else return [parent.entityID, 'introduction'].join('_');
    },

    edges: async (parent, args, context, info) => {
      return await context.loaders[entityClass].load('introduced', parent, args.pagination, parent.filter, false)
    },
  };
}

// Connection between two non-Generation entities (e.g. Ability and Stat, Pokemon and Move).
/*
  'ownerEntityClass' refers to the class of the starting node.
  'innerKey' will be the key in the appropriate loader object
  
  For example, for an AbilityModifiesStatConnection, 'ownerEntityClass' is 'ability' and 'innerKey' is 'modifiesStat'.
*/
const junctionConnection = (ownerEntityClass, innerKey) => {
  // Function arguments are used to determine which loader to use, via the 'context' object.
  return {
    id: (parent, args, context, info) => {
      if (parent.generation_id) return [parent.genID, parent.entityID, ownerEntityClass, innerKey].join('_')
      else return [parent.entityID, ownerEntityClass, innerKey].join('_');
    },

    edges: async (parent, args, context, info) => {
      return await context.loaders[ownerEntityClass].load(innerKey, parent, args.pagination, parent.filter, false);
    },
    
    count: async (parent, args, context, info) => {
      return await context.loaders[ownerEntityClass].load(innerKey, parent, args.pagination, parent.filter, true);
    },
  };
};

// Connection from Generation to a non-Generation entity, signifying that the entity is present in that Generation.
const presenceConnection = entityClass => {
  // 'parent' = 'generation_id'
  return {
    id: (parent, args, context, info) => {
      return [parent.genID, entityClass, 'presence'].join('_')
    },

    edges: async (parent, args, context, info) => {
      return await context.loaders.generation.load(entityClass, parent.genID, args.pagination, parent.filter, false, true)
    },

    count: async (parent, args, context, info) => {
      return await context.loaders.generation.load(entityClass, parent.genID, args.pagination, parent.filter, true, true)
    },
  };
};

// Connection from Generation to a non-Generation entity, signifying that the entity was introduced in that Generation.
const debutConnection = entityClass => {
  // 'parent' = 'generation_id'
  return {
    id: (parent, args, context, info) => {
      return [parent.genID, entityClass, 'debut'].join('_')
    },

    edges: async (parent, args, context, info) => {
      return await context.loaders.generation.load(entityClass, parent.genID, args.pagination, parent.filter, false, false)
    },

    count: async (parent, args, context, info) => {
      return await context.loaders.generation.load(entityClass, parent.genID, args.pagination, parent.filter, true, false)
    },
  };
};

//#endregion

module.exports = {
  queryEntities,
  queryEntitiesByColumn,

  abilityEdge,
  basicEdge,
  causeStatusEdge,
  descriptionEdge,
  evolutionEdge,
  formEdge,
  learnsetEdge,
  modifyStatEdge,
  multiplierEdge,
  powerEdge,
  turnsEdge,

  junctionConnection,
  generationConnection,
  introductionConnection,

  presenceConnection,
  debutConnection,

  parentPK,
  parentPKDebut,
  primaryKeyToID,
}