const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
} = require('./helpers.js');

let item = {
  activatedByFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'item', 'activates', true));
  },

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

  extendsFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'fieldState', 'extends'));
  },

  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  ignoresFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'fieldState', 'ignores'));
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

  resistsFieldState(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'fieldState', 'resists'));
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