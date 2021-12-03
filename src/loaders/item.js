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

  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  effect(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'effect'));
  },

  modifiesStat(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'stat', 'modifies'));
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