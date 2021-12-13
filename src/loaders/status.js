const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let status = {
  causedByAbility(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'status', 'causes', true));
  },

  causedByItem(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'status', 'causes', true));
  },

  causedByMove(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'status', 'causes', true));
  },
  
  resistedByAbility(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'ability', 'status', 'resists', true));
  },

  resistedByItem(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'status', 'resists', true));
  },

  resistedByMove(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'move', 'status', 'resists', true));
  },
}

module.exports = status;