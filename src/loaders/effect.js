const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens} = require('./helpers.js');

let effect = {
  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  effect(pagination) {
    return new DataLoader(effectBatcher(pagination, 'item'));
  }
}

module.exports = effect;