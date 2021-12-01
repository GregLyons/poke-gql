const generationResolvers = require('./generation.js');
const abilityResolvers = require('./ability.js');

const resolvers = [generationResolvers, abilityResolvers];

module.exports = {
  resolvers,
};