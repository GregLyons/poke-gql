const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens} = require('./helpers.js');

let usagemethod = {
  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  }
}

module.exports = usagemethod;