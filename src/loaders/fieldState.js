const {
  LoadersForEntity,
} = require('./helpers.js');

class FieldStateLoaders extends LoadersForEntity {
  
  constructor() {
    super();
  }

  activatesAbility(pagination, filter) {
    return [pagination, filter, 'fieldState', 'ability', 'field_state_activates_ability', false];
  }

  activatesItem(pagination, filter) {
    return [pagination, filter, 'fieldState', 'item', 'field_state_activates_item', false];
  }

  boostsType(pagination, filter) {
    return [pagination, filter, 'fieldState', 'type', 'field_state_boosts_ptype', false];
  }

  causesStatus(pagination, filter) {
    return [pagination, filter, 'fieldState', 'status', 'field_state_causes_pstatus', false];
  }

  createdByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'fieldState', 'ability_creates_field_state', true];
  }

  createdByMove(pagination, filter) {
    return [pagination, filter, 'move', 'fieldState', 'pmove_creates_field_state', true];
  }
  
  effect(pagination, filter) {
    return [pagination, filter, 'fieldState', 'effect', 'field_state_effect', false];
  }

  enhancesMove(pagination, filter) {
    return [pagination, filter, 'fieldState', 'move', 'field_state_enhances_pmove', false];
  }

  extendedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'fieldState', 'item_extends_field_state', true];
  }
  
  hindersMove(pagination, filter) {
    return [pagination, filter, 'fieldState', 'move', 'field_state_hinders_pmove', false];
  }

  ignoredByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'fieldState', 'ability_ignores_field_state', true];
  }

  ignoredByItem(pagination, filter) {
    return [pagination, filter, 'item', 'fieldState', 'item_ignores_field_state', true];
  }

  ignoredByType(pagination, filter) {
    return [pagination, filter, 'type', 'fieldState', 'ptype_ignores_field_state', true];
  }
  
  modifiesStat(pagination, filter) {
    return [pagination, filter, 'fieldState', 'stat', 'field_state_modifies_stat', false];
  }

  preventedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'fieldState', 'ability_prevents_field_state', true];
  }

  removedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'fieldState', 'ability_removes_field_state', true];
  }

  removedByMove(pagination, filter) {
    return [pagination, filter, 'move', 'fieldState', 'pmove_removes_field_state', true];
  }

  removedByType(pagination, filter) {
    return [pagination, filter, 'type', 'fieldState', 'ptype_removes_field_state', true];
  }

  resistedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'fieldState', 'item_resists_field_state', true];
  }

  resistedByType(pagination, filter) {
    return [pagination, filter, 'type', 'fieldState', 'ptype_resists_field_state', true];
  }

  resistsStatus(pagination, filter) {
    return [pagination, filter, 'fieldState', 'status', 'field_state_prevents_pstatus', false];
  }
  
  suppressedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'fieldState', 'ability_suppresses_field_state', true];
  }

  weakensType(pagination, filter) {
    return [pagination, filter, 'fieldState', 'type', 'field_state_resists_ptype', false];
  }

  weatherBall(pagination, filter) {
    return [pagination, filter, 'fieldState', 'type', 'weather_ball', false];
  }
}

module.exports = new FieldStateLoaders();