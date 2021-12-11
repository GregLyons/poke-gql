const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let type = {
  boostedByAbility(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'type', 'boosts', true));
  },

  boostedByItem(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'type', 'boosts', true));
  },

  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  move(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'type', '', true));
  },

  pokemon(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'pokemon', 'type', '', true));
  },
  
  resistedByAbility(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'type', 'resists', true));
  },

  resistedByItem(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'type', 'resists', true));
  },

}

module.exports = type;