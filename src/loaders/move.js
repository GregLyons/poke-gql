const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, effectBatcher} = require('./helpers.js');

let move = {
  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  effect(pagination) {
    return new DataLoader(effectBatcher(pagination, 'pmove'));
  }
}

module.exports = move;