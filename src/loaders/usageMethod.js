const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let usagemethod = {
  boostedByAbility(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'usageMethod', 'boosts', true));
  },

  boostedByItem(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'usageMethod', 'boosts', true));
  },

  generation(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  move(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'usageMethod', '', true));
  },
  
  resistedByAbility(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'usageMethod', 'resists', true));
  },

  resistedByItem(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'usageMethod', 'resists', true));
  },
}

module.exports = usagemethod;