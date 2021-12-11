const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let pokemon = {
  ability(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'pokemon', 'ability'));
  },
  
  enablesItem(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'pokemon', 'requires', true));
  },

  enablesMove(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'pokemon', 'requires', true));
  },

  evolvesFrom(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'pokemon', 'pokemon', 'evolution', true));
  },

  evolvesTo(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'pokemon', 'pokemon', 'evolution'));
  },

  form(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'pokemon', 'pokemon', 'form'));
  },

  generation(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  move(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'pokemon', 'move'));
  },

  requiresItem(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'pokemon', 'item', 'requires'));
  },

  type(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'pokemon', 'type'));
  },
}

module.exports = pokemon;