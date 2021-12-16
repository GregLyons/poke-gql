const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
  basicJunctionBatcherCount,
} = require('./helpers.js');

let type = {
  boostedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'type', 'boosts', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  boostedByFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'boosts', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  boostedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'type', 'boosts', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  defensiveMatchup(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'type', 'type', 'ptype_matchup', true))
  },
  
  enablesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'type', 'requires', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  ignoresFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'type', 'fieldState', 'ignores', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },
  
  move(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'type', '', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  naturalGift(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'type', 'natural_gift', true))
  },
  
  pokemon(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'type', '', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  offensiveMatchup(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'type', 'type', 'ptype_matchup'))
  },

  removesFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'type', 'fieldState', 'removes', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  resistedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'type', 'resists', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  resistedByFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'resists', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  resistedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'type', 'resists', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  resistsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'type', 'fieldState', 'resists', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  weatherBall(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'type', 'natural_gift', true))
  },
}

module.exports = type;