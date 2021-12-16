const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
} = require('./helpers.js');

let fieldState = {
  activatesAbility(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'ability', 'activates'));
  },

  activatesItem(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'item', 'activates'));
  },

  boostsType(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'type', 'boosts'));
  },

  causesStatus(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'status', 'causes'));
  },

  createdByAbility(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'fieldState', 'creates', true));
  },

  createdByMove(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'fieldState', 'creates', true));
  },
  
  effect(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'effect'));
  },

  enhancesMove(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'move', 'enhances'));
  },

  extendedByItem(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'fieldState', 'extends', true));
  },
  
  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  hindersMove(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'move', 'hinders'));
  },

  ignoredByAbility(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'fieldState', 'ignores', true));
  },

  ignoredByItem(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'fieldState', 'ignores', true));
  },
  
  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },
  
  modifiesStat(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'stat', 'modifies'));
  },

  preventedByAbility(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'fieldState', 'prevents', true));
  },

  removedByAbility(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'fieldState', 'removes', true));
  },

  removedByMove(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'fieldState', 'removes', true));
  },

  resistedByItem(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'fieldState', 'resists', true));
  },

  resistsStatus(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'status', 'resists'));
  },

  resistsType(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'type', 'resists'));
  },

  suppressedByAbility(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'fieldState', 'suppresses', true));
  },

  weatherBall(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'type', 'weather_ball'))
  },
}

module.exports = fieldState;