const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let usagemethod = {
  boostedByAbility(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'usageMethod', 'boosts', true));
  },

  boostedByItem(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'usageMethod', 'boosts', true));
  },

  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  move(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'usageMethod', '', true));
  },
  
  resistedByAbility(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'usageMethod', 'resists', true));
  },

  resistedByItem(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'usageMethod', 'resists', true));
  },
}

module.exports = usagemethod;