const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens} = require('./helpers.js');

let versiongroup = {
  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  }
}

module.exports = versiongroup;