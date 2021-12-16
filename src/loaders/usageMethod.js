const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
  basicJunctionBatcherCount,
} = require('./helpers.js');

let usagemethod = {
  boostedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'usageMethod', 'boosts', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  boostedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'usageMethod', 'boosts', true];

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

  move(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'usageMethod', '', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  resistedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'usageMethod', 'resists', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  resistedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'usageMethod', 'resists', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
}

module.exports = usagemethod;