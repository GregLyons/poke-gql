const DataLoader = require('dataloader');
const {db} = require('../models/index.js');
const {batchGens, basicJunctionBatcher} = require('./helpers.js');

let status = {
  causedByAbility(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'status', 'causes', true));
  },

  causedByItem(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'status', 'causes', true));
  },

  causedByMove(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'status', 'causes', true));
  },
  
  resistedByAbility(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'ability', 'status', 'resists', true));
  },

  resistedByItem(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'item', 'status', 'resists', true));
  },

  resistedByMove(pagination) {
    return new DataLoader(basicJunctionBatcher(pagination, 'move', 'status', 'resists', true));
  },
}

module.exports = status;