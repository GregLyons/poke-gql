const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
  basicJunctionBatcherCount,
} = require('./helpers.js');

let pokemon = {
  ability(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'ability', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
  
  enablesItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'pokemon', 'requires', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  enablesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'pokemon', 'requires', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  evolvesFrom(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'pokemon', 'evolution', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  evolvesTo(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'pokemon', 'evolution', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  form(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'pokemon', 'form', false];

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
    const databaseInfo = [pagination, filter, 'pokemon', 'move', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  requiresItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'item', 'requires', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  type(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'type', false];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },
        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
}

module.exports = pokemon;