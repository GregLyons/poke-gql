const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, effectBatcher} = require('./helpers.js');

let ability = {
  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  effect(pagination) {
    return new DataLoader(effectBatcher(pagination, 'ability'));
  }
}

module.exports = ability;