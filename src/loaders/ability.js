const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let ability = {
  introduced(pagination) {
    return new DataLoader(batchGens(pagination));
  },

  effect(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'effect'));
  },

  resistStatus(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'status', 'resists'));
  },
}

module.exports = ability;