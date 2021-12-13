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



// EDGES
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

//#endregion

// CONNECTIONS
//#region

// Connection for presence of an entity (e.g. Ability, Effect, Move) in a given Generation.
const generationConnection = entityName => {
  // 'parent' = 'generation'
  return {
    edges: async (parent, args, context, info) => {
      return await context.loaders[entityName].generation(args.pagination, args.filter).load(parent);
    },

    // count: async (parent, args, context, info) => {
    //   return await context.db.promise().query(
    //     `
    //       SELECT COUNT(*) FROM 'generation'
    //       WHERE generation_id = ${parent}
    //     `
    //   )
    //   .then( ([results, fields]) => { return Object.values(results[0])[0] })
    //   .catch(console.log);
    // },
  }
}

// Connection for Generation in which an entity (e.g. Item, Pokemon) was introduced.
const introductionConnection = entityName => {
  // 'parent' = 'introduced'
  return {
    edges: async (parent, args, context, info) => {
      return await context.loaders[entityName].introduced(args.pagination, args.filter).load(parent);
    },

    // count: async (parent, args, context, info) => {
    //   return await context.db.promise().query(
    //     `
    //       SELECT COUNT(*) FROM 'generation'
    //       WHERE generation_id = ${parent}
    //     `
    //   )
    //   .then( ([results, fields]) => { return Object.values(results[0])[0] })
    //   .catch(console.log);
    // },
  }
}

// Connection between two entities (e.g. Ability and Stat, Pokemon and Move).
/*
  'ownerEntityName' and 'ownedEntityName' refer to the starting and ending Node, respectively, e.g. 'Pokemon' and 'Ability'--owner and owned, respectively--in PokemonAbilityConnection.

  'extra' describes the Connection further, e.g. 'causes' in AbilityCausesStatusConnection, as opposed to 'resists' in AbilityResistsStatusConnection.
*/
const basicJunctionConnection = (ownerEntityName, ownedEntityName, extra = '') => {
  // Function arguments are used to determine which loader to use, via the 'context' object.
  const innerKey = extra
    ? extra + ownedEntityName[0].toUpperCase() + ownedEntityName.slice(1)
    : ownedEntityName;

  return {
    edges: async (parent, args, context, info) => {
      return await context.loaders[ownerEntityName][innerKey](args.pagination, args.filter).load(parent);
    },

    // count: async (parent, args, context, info) => {
    //   return 'yo';
    // },
  }
};

//#endregion

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

  parentPK,
}