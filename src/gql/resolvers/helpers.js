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

// 
//#region

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

//#endregion

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

const basicEdge = () => {
  return {
    // node: parent => parent,
    node: parent => {
      return parent
    },
  };
};

const causeStatusEdge = () => {
  return {
    node: parent => parent,
    chance: parent => parent.chance,
  }
}

const evolutionEdge = () => {
  return {
    node: parent => parent,
    method: parent => parent.evolution_method,
  }
}

const formEdge = () => {
  return {
    node: parent => parent,
    class: parent => parent.form_class.toUpperCase(),
  }
}

const learnsetEdge = () => {
  return {
    node: parent => parent,
    learnMethod: parent => parent.learn_method,
  }
}

const modifyStatEdge = () => {
  return {
    node: parent => parent,
    chance: parent => parent.chance,
    multiplier: parent => parent.multiplier,
    recipient: parent => parent.recipient.toUpperCase(),
    stage: parent => parent.stage,
  }
}

const multiplierEdge = () => {
  return {
    node: parent => parent,
    multiplier: parent => parent.multiplier,
  }
}

const powerEdge = () => {
  return {
    node: parent => parent,
    power: parent => parent.power,
  }
}

const generationConnection = entityName => {
  // 'parent' = 'generation'
  return {
    edges: async (parent, args, context, info) => {
      return await context.loaders[entityName].generation(args.pagination).load(parent);
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

const basicJunctionConnection = (ownerEntityName, ownedEntityName, extra = '') => {
  const innerKey = extra
    ? extra + ownedEntityName[0].toUpperCase() + ownedEntityName.slice(1)
    : ownedEntityName;

  return {
    edges: async (parent, args, context, info) => {
      return await context.loaders[ownerEntityName][innerKey](args.pagination).load(parent);
    },

    count: async (parent, args, context, info) => {
      return 'yo';
    },
  }
};

module.exports = {
  entityNameToTableName,
  
  abilityEdge,
  basicEdge,
  causeStatusEdge,
  evolutionEdge,
  formEdge,
  learnsetEdge,
  modifyStatEdge,
  multiplierEdge,
  powerEdge,

  basicJunctionConnection,
  generationConnection,
  introductionConnection,
  
  parentGenID,
  parentPK,
}