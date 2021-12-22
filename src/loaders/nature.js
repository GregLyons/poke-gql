const {
  LoadersForEntity,
} = require('./helpers.js');

class NatureLoaders extends LoadersForEntity {
  
  constructor() {
    super();
  }

  confusedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'nature', 'item_confuses_nature', true];
  }

  modifiesStat(pagination, filter) {
    return [pagination, filter, 'nature', 'stat', 'nature_modifies_stat', false];
  }
}

module.exports = new NatureLoaders();