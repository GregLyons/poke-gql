const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens} = require('./helpers.js');

let type = {
  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  }
}

module.exports = type;