const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let stat = {
  modifiedByAbility(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'stat', 'modifies', true));
  },

  modifiedByItem(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'stat', 'modifies', true));
  },

  modifiedByMove(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'stat', 'modifies', true));
  },
}

module.exports = stat;