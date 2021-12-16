const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
  basicJunctionBatcherCount,
} = require('./helpers.js');

let ability = {
  activatedByFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'activates', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  boostsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'type', 'boosts', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  boostsUsageMethod(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'usageMethod', 'boosts', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  causesStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'status', 'causes', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  createsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'creates', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  effect(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'effect', '', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  ignoresFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ignores', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },
  
  modifiesStat(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'stat', 'modifies', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  pokemon(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'ability', '', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  preventsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'prevents', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  removesFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'removes', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  resistsStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'status', 'resists', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  resistsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'type', 'resists', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  resistsUsageMethod(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'usageMethod', 'resists', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  suppressesFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'suppresses', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
}

module.exports = ability;