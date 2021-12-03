const generationResolvers = require('./generation.js');
const abilityResolvers = require('./ability.js');
const effectResolvers = require('./effect.js');
const itemResolvers = require('./item.js');
const moveResolvers = require('./move.js');
const pokemonResolvers = require('./pokemon.js');
const statusResolvers = require('./status.js');
const typeResolvers = require('./type.js');
const usageMethodResolvers = require('./usageMethod.js');
const versionGroupResolvers = require('./versionGroup.js');

const resolvers = [
  generationResolvers,
  abilityResolvers,
  effectResolvers,
  itemResolvers,
  moveResolvers,
  pokemonResolvers,
  statusResolvers,
  typeResolvers,
  usageMethodResolvers,
  versionGroupResolvers,
];

module.exports = {
  resolvers,
};