const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let pokemon = {
  ability(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'pokemon', 'ability'));
  },

  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  move(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'pokemon', 'move'));
  },

  type(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'pokemon', 'type'));
  },
}

module.exports = pokemon;