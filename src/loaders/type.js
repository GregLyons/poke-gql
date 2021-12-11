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

  defensiveMatchup(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'type', 'type', 'ptype_matchup', true))
  },
  
  enablesMove(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'type', 'requires', true));
  },
  
  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },
  
  move(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'type', '', true));
  },
  
  naturalGift(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'type', 'natural_gift', true))
  },
  
  pokemon(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'pokemon', 'type', '', true));
  },

  offensiveMatchup(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'type', 'type', 'ptype_matchup'))
  },
  
  resistedByAbility(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'type', 'resists', true));
  },

  resistedByItem(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'type', 'resists', true));
  },

}

module.exports = type;