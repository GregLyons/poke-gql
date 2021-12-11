const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let ability = {
  boostsType(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'type', 'boosts'));
  },

  boostsUsageMethod(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'usageMethod', 'boosts'));
  },

  causesStatus(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'status', 'causes'));
  },
  
  effect(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'effect'));
  },
  
  generation(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },
  
  modifiesStat(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'stat', 'modifies'));
  },

  resistsStatus(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'status', 'resists'));
  },

  resistsType(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'type', 'resists'));
  },

  resistsUsageMethod(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'usageMethod', 'resists'));
  },
}

module.exports = ability;