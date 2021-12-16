const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
} = require('./helpers.js');

let move = {
  causesStatus(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'status', 'causes'));
  },

  createsFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'fieldState', 'creates'));
  },
  
  effect(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'effect'));
  },
  
  enablesMove(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'move', 'requires', true));
  },
  
  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },
  
  modifiesStat(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'stat', 'modifies'));
  },

  pokemon(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'pokemon', 'move', '', true));
  },
  
  removesFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'fieldState', 'removes'));
  },

  requiresItem(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'item', 'requires'));
  },
  
  requiresMove(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'move', 'requires'));
  },
  
  requiresPokemon(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'pokemon', 'requires'));
  },
  
  requiresType(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'type', 'requires'));
  },

  resistStatus(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'status', 'resists'));
  },
  
  type(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'type'));
  },

  usageMethod(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'usageMethod'));
  },
}

module.exports = move;