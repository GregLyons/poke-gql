const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
  basicJunctionBatcherCount,
} = require('./helpers.js');

let effect = {
  ability(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'effect', '', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  fieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'effect', '', true];

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
  
  item(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'effect', '', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },

  move(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'effect', '', true];

    return {
        loader: function() { return new DataLoader(basicJunctionBatcher(databaseInfo)) },

        counter: function() { return new DataLoader(basicJunctionBatcherCount(databaseInfo)) },
    }  },
}

module.exports = effect;