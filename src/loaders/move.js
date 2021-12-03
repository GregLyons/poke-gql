const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let move = {
  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  effect(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'effect'));
  },

  modifiesStat(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'stat', 'modifies'));
  },
  
  resistStatus(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'status', 'resists'));
  },
  
  requiresItem(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'item', 'requires'));
  },
  
  requiresMove(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'move', 'requires'));
  },
  
  requiresPokemon(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'pokemon', 'requires'));
  },
  
  requiresType(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'type', 'requires'));
  },
  
  // TODO: change pmove_has_ptype to pmove_type to remove 'hasType'
  type(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'type', 'has'));
  },

  usageMethod(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'usageMethod'));
  },
}

module.exports = move;