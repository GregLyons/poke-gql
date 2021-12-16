const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
} = require('./helpers.js');

let effect = {
  ability(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'effect', '', true));
  },

  fieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'effect', '', true));
  },
  
  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },
  
  item(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'effect', '', true));
  },

  move(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'effect', '', true));
  },
}

module.exports = effect;