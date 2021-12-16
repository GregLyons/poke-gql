const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
  basicJunctionBatcherCount,
} = require('./helpers.js');

let fieldState = {
  activatesAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'ability', 'activates', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  activatesItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'item', 'activates', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  boostsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'boosts', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  causesStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'status', 'causes', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  createdByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'creates', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  createdByMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'fieldState', 'creates', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  effect(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'effect', '', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  enhancesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'move', 'enhances', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  extendedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'extends', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  hindersMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'move', 'hinders', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  ignoredByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ignores', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  ignoredByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'ignores', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },
  
  modifiesStat(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'stat', 'modifies', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  preventedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'prevents', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  removedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'removes', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  removedByMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'fieldState', 'removes', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  resistedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'resists', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  resistsStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'status', 'resists', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  resistsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'resists', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  suppressedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'suppresses', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  weatherBall(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'type', 'weather_ball'))
  },
}

module.exports = fieldState;