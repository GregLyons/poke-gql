const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let effect = {
  ability(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'effect', '', true));
  },
  
  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },
  
  item(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'effect', '', true));
  },

  effect(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item'));
  },

  move(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'effect', '', true));
  },
}

module.exports = effect;