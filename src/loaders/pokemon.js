const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let pokemon = {
  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  type(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'pokemon', 'type'));
  },
}

module.exports = pokemon;