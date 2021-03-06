const generationResolvers = require('./generation.js');
const abilityResolvers = require('./ability.js');
const descriptionResolvers = require('./description.js');
const effectResolvers = require('./effect.js');
const fieldStateResolvers = require('./fieldState.js');
const itemResolvers = require('./item.js');
const moveResolvers = require('./move.js');
const natureResolvers = require('./nature.js');
const pokemonResolvers = require('./pokemon.js');
const statResolvers = require('./stat.js');
const statusResolvers = require('./status.js');
const typeResolvers = require('./type.js');
const usageMethodResolvers = require('./usageMethod.js');
const versionGroupResolvers = require('./versionGroup.js');

const resolvers = [
  generationResolvers,
  abilityResolvers,
  descriptionResolvers,
  effectResolvers,
  fieldStateResolvers,
  itemResolvers,
  moveResolvers,
  natureResolvers,
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