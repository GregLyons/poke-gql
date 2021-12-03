const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let item = {
  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  effect(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'effect'));
  },

  requiresPokemon(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'pokemon', 'requires'));
  },

  resistStatus(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'status', 'resists'));
  },
}

module.exports = item;