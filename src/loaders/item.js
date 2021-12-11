const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let item = {
  boostsType(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'type', 'boosts'));
  },

  boostsUsageMethod(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'usageMethod', 'boosts'));
  },

  causesStatus(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'status', 'causes'));
  },
  
  effect(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'effect'));
  },
  
  enablesMove(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'item', 'requires', true));
  },

  enablesPokemon(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'pokemon', 'item', 'requires', true));
  },

  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  modifiesStat(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'stat', 'modifies'));
  },

  naturalGift(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'type', 'natural_gift'))
  },

  resistsStatus(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'status', 'resists'));
  },

  resistsType(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'type', 'resists'));
  },

  resistsUsageMethod(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'usageMethod', 'resists'));
  },
}

module.exports = item;