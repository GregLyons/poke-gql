const {
  LoadersForEntity,
} = require('./helpers.js');

class TypeLoaders extends LoadersForEntity {
  
  constructor() {
    super();
  }
  
  boostedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'type', 'ability_boosts_ptype', true];
  }

  boostedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'type', 'field_state_boosts_ptype', true];
  }

  boostedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'type', 'item_boosts_ptype', true];
  }

  // TODO
  defensiveMatchup(pagination, filter) {
    return [pagination, filter, 'type', 'type', 'ptype_matchup', true];
  }
  
  enablesMove(pagination, filter) {
    return [pagination, filter, 'move', 'type', 'pmove_requires_ptype', true];
  }
  
  ignoresFieldState(pagination, filter) {
    return [pagination, filter, 'type', 'fieldState', 'ptype_ignores_field_state', false];
  }

  move(pagination, filter) {
    return [pagination, filter, 'move', 'type', 'pmove_ptype', true];
  }
  
  // TODO
  naturalGift(pagination, filter) {
    return [pagination, filter, 'item', 'type', 'natural_gift', true];
  }
  
  pokemon(pagination, filter) {
    return [pagination, filter, 'pokemon', 'type', 'pokemon_ptype', true];
  }

  // TODO
  offensiveMatchup(pagination, filter) {
    return [pagination, filter, 'type', 'type', 'ptype_matchup', false];
  }

  removesFieldState(pagination, filter) {
    return [pagination, filter, 'type', 'fieldState', 'ptype_removes_field_state', false];
  }
  
  resistedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'type', 'ability_resists_ptype', true];
  }

  resistedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'type', 'field_state_resists_ptype', true];
  }

  resistedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'type', 'item_resists_ptype', true];
  }

  resistsFieldState(pagination, filter) {
    return [pagination, filter, 'type', 'fieldState', 'ptype_resists_field_state', false];
  }

  weatherBall(pagination, filter) {
    return [pagination, filter, 'fieldState', 'type', 'weather_ball', true];
  }
}

module.exports = new TypeLoaders();