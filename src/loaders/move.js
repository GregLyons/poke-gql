const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
  basicJunctionBatcherCount,
} = require('./helpers.js');

let move = {
  causesStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'status', 'causes', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  createsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'fieldState', 'creates', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  effect(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'effect', '', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  enablesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'move', 'requires', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },
  
  modifiesStat(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'stat', 'modifies', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  pokemon(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'move', '', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  removesFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'fieldState', 'removes', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  requiresItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'item', 'requires', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  requiresMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'move', 'requires', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  requiresPokemon(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'pokemon', 'requires', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  requiresType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'type', 'requires', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  resistStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'status', 'resists', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  type(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'type', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  usageMethod(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'usageMethod', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
}

module.exports = move;