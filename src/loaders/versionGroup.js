const DataLoader = require('dataloader');
const {
  batchGens,
} = require('./helpers.js');

class VersionGroup {
  introduced(pagination, filter) {
    if (!this.loader) {
      this.loader = new DataLoader(batchGens(pagination, filter))
    }
    return { 
      loader: this.loader,
    };
  }
}

module.exports = new VersionGroup();