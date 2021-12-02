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

  type(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'type'));
  },
}

module.exports = move;