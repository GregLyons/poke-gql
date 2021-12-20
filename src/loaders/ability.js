const {
  getGenLoader,

  LoadersForEntity,
} = require('./helpers.js');

class Ability extends LoadersForEntity {
  
  constructor() {
    super();
  }

  activatedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'ability', 'field_state_activates_ability', true];
  }

  boostsType(pagination, filter) {
    return [pagination, filter, 'ability', 'type', 'ability_boosts_ptype', false];
  }

  boostsUsageMethod(pagination, filter) {
    return [pagination, filter, 'ability', 'usageMethod', 'ability_boosts_usage_method', false];
  }

  causesStatus(pagination, filter) {
    return [pagination, filter, 'ability', 'status', 'ability_causes_pstatus', false];
  }

  createsFieldState(pagination, filter) {
    return [pagination, filter, 'ability', 'fieldState', 'ability_creates_field_state', false];
  }

  description(pagination, filter) {
    return [pagination, filter, 'description', 'ability', 'pdescription_ability', true];
  }
  
  effect(pagination, filter) {
    return [pagination, filter, 'ability', 'effect', 'ability_effect', false];
  }
  
  ignoresFieldState(pagination, filter) {
    return [pagination, filter, 'ability', 'fieldState', 'ability_ignores_field_state', false];
  }
    
  modifiesStat(pagination, filter) {
    return [pagination, filter, 'ability', 'stat', 'ability_modifies_stat', false];
  }

  pokemon(pagination, filter) {
    return [pagination, filter, 'pokemon', 'ability', 'pokemon_ability', true];
  }

  preventsFieldState(pagination, filter) {
    return [pagination, filter, 'ability', 'fieldState', 'ability_prevents_field_state', false];
  }

  removesFieldState(pagination, filter) {
    return [pagination, filter, 'ability', 'fieldState', 'ability_removes_field_state', false];
  }

  resistsStatus(pagination, filter) {
    return [pagination, filter, 'ability', 'status', 'ability_resists_pstatus', false];
  }

  resistsType(pagination, filter) {
    return [pagination, filter, 'ability', 'type', 'ability_resists_ptype', false];
  }

  resistsUsageMethod(pagination, filter) {
    return [pagination, filter, 'ability', 'usageMethod', 'ability_resists_usage_method', false];
  }

  suppressesFieldState(pagination, filter) {
    return [pagination, filter, 'ability', 'fieldState', 'ability_suppresses_field_state', false];
  }
}

module.exports = new Ability();