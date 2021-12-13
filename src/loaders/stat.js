const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let stat = {
  modifiedByAbility(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'stat', 'modifies', true));
  },

  modifiedByItem(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'stat', 'modifies', true));
  },

  modifiedByMove(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'stat', 'modifies', true));
  },
}

module.exports = stat;