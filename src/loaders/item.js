const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
  basicJunctionBatcherCount,
} = require('./helpers.js');

let item = {
  activatedByFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'item', 'activates', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  boostsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'type', 'boosts', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  boostsUsageMethod(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'usageMethod', 'boosts', false];

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
  
  effect(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'effect', '', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  enablesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'item', 'requires', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  enablesPokemon(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'item', 'requires', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  extendsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'extends', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  ignoresFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'ignores', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  modifiesStat(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'stat', 'modifies', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  naturalGift(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'type', 'natural_gift'))
  },

  resistsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'resists', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  resistsStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'status', 'resists', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  resistsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'type', 'resists', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  resistsUsageMethod(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'usageMethod', 'resists', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
}

module.exports = item;