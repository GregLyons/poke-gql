// Gather all the SDL type definitions and export them.
const fs = require('fs');
const path = require('path');

// Import SDL files as strings.
const Ability = fs.readFileSync(path.join(__dirname, 'ability.gql'), 'utf-8');
const Description = fs.readFileSync(path.join(__dirname, 'description.gql'), 'utf-8');
const Effect = fs.readFileSync(path.join(__dirname, 'effect.gql'), 'utf-8');
const FieldState = fs.readFileSync(path.join(__dirname, 'fieldState.gql'), 'utf-8');
const Generation = fs.readFileSync(path.join(__dirname, 'generation.gql'), 'utf-8');
const Helpers = fs.readFileSync(path.join(__dirname, 'helpers.gql'), 'utf-8');
const Item = fs.readFileSync(path.join(__dirname, 'item.gql'), 'utf-8');
const Move = fs.readFileSync(path.join(__dirname, 'move.gql'), 'utf-8');
const Nature = fs.readFileSync(path.join(__dirname, 'nature.gql'), 'utf-8');
const Pokemon = fs.readFileSync(path.join(__dirname, 'pokemon.gql'), 'utf-8');
const Sprite = fs.readFileSync(path.join(__dirname, 'sprite.gql'), 'utf-8');
const Stat = fs.readFileSync(path.join(__dirname, 'stat.gql'), 'utf-8');
const Status = fs.readFileSync(path.join(__dirname, 'status.gql'), 'utf-8');
const Type = fs.readFileSync(path.join(__dirname, 'type.gql'), 'utf-8');
const UsageMethod = fs.readFileSync(path.join(__dirname, 'usageMethod.gql'), 'utf-8');
const VersionGroup = fs.readFileSync(path.join(__dirname, 'versionGroup.gql'), 'utf-8');

const typeDefs = [
  Ability,
  Description,
  Effect,
  FieldState,
  Generation,
  Helpers,
  Item,
  Move,
  Nature,
  Pokemon,
  Sprite,
  Stat,
  Status,
  Type,
  UsageMethod,
  VersionGroup,
];

module.exports = {
  typeDefs
}