const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let type = {
  boostedByAbility(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'type', 'boosts', true));
  },

  boostedByFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'type', 'boosts', true));
  },

  boostedByItem(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'type', 'boosts', true));
  },

  defensiveMatchup(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'type', 'type', 'ptype_matchup', true))
  },
  
  enablesMove(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'type', 'requires', true));
  },
  
  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  ignoresFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'type', 'fieldState', 'ignores'));
  },

  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },
  
  move(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'type', '', true));
  },
  
  naturalGift(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'type', 'natural_gift', true))
  },
  
  pokemon(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'pokemon', 'type', '', true));
  },

  offensiveMatchup(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'type', 'type', 'ptype_matchup'))
  },

  removesFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'type', 'fieldState', 'removes'));
  },
  
  resistedByAbility(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'type', 'resists', true));
  },

  resistedByFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'type', 'resists', true));
  },

  resistedByItem(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'type', 'resists', true));
  },

  resistsFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'type', 'fieldState', 'resists'));
  },

  weatherBall(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'type', 'natural_gift', true))
  },
}

module.exports = type;