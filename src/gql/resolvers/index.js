const generationResolvers = require('./generation.js');
const abilityResolvers = require('./ability.js');
const effectResolvers = require('./effect.js');
const fieldStateResolvers = require('./fieldState.js');
const itemResolvers = require('./item.js');
const moveResolvers = require('./move.js');
const pokemonResolvers = require('./pokemon.js');
const statResolvers = require('./stat.js');
const statusResolvers = require('./status.js');
const typeResolvers = require('./type.js');
const usageMethodResolvers = require('./usageMethod.js');
const versionGroupResolvers = require('./versionGroup.js');

const resolvers = [
  generationResolvers,
  abilityResolvers,
  effectResolvers,
  fieldStateResolvers,
  itemResolvers,
  moveResolvers,
  pokemonResolvers,
  statResolvers,
  statusResolvers,
  typeResolvers,
  usageMethodResolvers,
  versionGroupResolvers,
];

module.exports = {
  resolvers,
};