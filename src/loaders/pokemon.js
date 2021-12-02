const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens} = require('./helpers.js');

let pokemon = {
  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  }
}

module.exports = pokemon;