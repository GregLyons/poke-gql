const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let item = {
  boostsType(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'type', 'boosts'));
  },

  boostsUsageMethod(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'usageMethod', 'boosts'));
  },

  causesStatus(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'status', 'causes'));
  },
  
  effect(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'effect'));
  },
  
  enablesMove(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'item', 'requires', true));
  },

  enablesPokemon(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'pokemon', 'item', 'requires', true));
  },

  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  modifiesStat(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'stat', 'modifies'));
  },

  naturalGift(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'type', 'natural_gift'))
  },

  resistsStatus(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'status', 'resists'));
  },

  resistsType(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'type', 'resists'));
  },

  resistsUsageMethod(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'usageMethod', 'resists'));
  },
}

module.exports = item;