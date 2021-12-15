const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let ability = {
  activatedByFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'fieldState', 'activates', true));
  },

  boostsType(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'type', 'boosts'));
  },

  boostsUsageMethod(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'usageMethod', 'boosts'));
  },

  causesStatus(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'status', 'causes'));
  },

  createsFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'fieldState', 'creates'));
  },
  
  effect(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'effect'));
  },
  
  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  ignoresFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'fieldState', 'ignores'));
  },

  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },
  
  modifiesStat(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'stat', 'modifies'));
  },

  pokemon(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'pokemon', 'ability', '', true));
  },

  preventsFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'fieldState', 'prevents'));
  },

  removesFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'fieldState', 'removes'));
  },

  resistsStatus(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'status', 'resists'));
  },

  resistsType(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'type', 'resists'));
  },

  resistsUsageMethod(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'usageMethod', 'resists'));
  },

  suppressesFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'fieldState', 'suppresses'));
  },
}

module.exports = ability;