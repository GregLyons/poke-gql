const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
} = require('./helpers.js');

let pokemon = {
  ability(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'pokemon', 'ability'));
  },
  
  enablesItem(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'pokemon', 'requires', true));
  },

  enablesMove(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'pokemon', 'requires', true));
  },

  evolvesFrom(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'pokemon', 'pokemon', 'evolution', true));
  },

  evolvesTo(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'pokemon', 'pokemon', 'evolution'));
  },

  form(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'pokemon', 'pokemon', 'form'));
  },

  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  },

  move(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'pokemon', 'move'));
  },

  requiresItem(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'pokemon', 'item', 'requires'));
  },

  type(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'pokemon', 'type'));
  },
}

module.exports = pokemon;