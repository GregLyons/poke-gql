const DataLoader = require('dataloader');
const {
  batchGens,
} = require('./helpers.js');

class VersionGroup {
  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  }
}

module.exports = new VersionGroup();