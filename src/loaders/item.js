const {
  LoadersForEntity,
} = require('./helpers.js');

class ItemLoaders extends LoadersForEntity {
  
  constructor() {
    super();
  }

  activatedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'item', 'field_state_activates_item', true];
  }

  boostsType(pagination, filter) {
    return [pagination, filter, 'item', 'type', 'item_boosts_ptype', false];
  }

  boostsUsageMethod(pagination, filter) {
    return [pagination, filter, 'item', 'usageMethod', 'item_boosts_usage_method', false];
  }

  causesStatus(pagination, filter) {
    return [pagination, filter, 'item', 'status', 'item_causes_pstatus', false];
  }

  confusesNature(pagination, filter) {
    return [pagination, filter, 'item', 'nature', 'item_confuses_nature', false];
  }

  description(pagination, filter) {
    return [pagination, filter, 'description', 'item', 'pdescription_item', true];
  }
  
  effect(pagination, filter) {
    return [pagination, filter, 'item', 'effect', 'item_effect', false];
  }
  
  enablesMove(pagination, filter) {
    return [pagination, filter, 'move', 'item', 'pmove_requires_item', true];
  }

  enablesPokemon(pagination, filter) {
    return [pagination, filter, 'pokemon', 'item', 'pokemon_requires_item', true];
  }

  extendsFieldState(pagination, filter) {
    return [pagination, filter, 'item', 'fieldState', 'item_extends_field_state', false];
  }

  ignoresFieldState(pagination, filter) {
    return [pagination, filter, 'item', 'fieldState', 'item_ignores_field_state', false];
  }
  
  modifiesStat(pagination, filter) {
    return [pagination, filter, 'item', 'stat', 'item_modifies_stat', false];
  }

  // TODO
  naturalGift(pagination, filter) {
    return [pagination, filter, 'item', 'type', 'natural_gift', false];
  }

  requiresPokemon(pagination, filter) {
    return [pagination, filter, 'item', 'pokemon', 'item_requires_pokemon', false];
  }

  resistsFieldState(pagination, filter) {
    return [pagination, filter, 'item', 'fieldState', 'item_resists_field_state', false];
  }

  resistsStatus(pagination, filter) {
    return [pagination, filter, 'item', 'status', 'item_resists_pstatus', false];
  }

  resistsType(pagination, filter) {
    return [pagination, filter, 'item', 'type', 'item_resists_ptype', false];
  }

  resistsUsageMethod(pagination, filter) {
    return [pagination, filter, 'item', 'usageMethod', 'item_resists_usage_method', false];
  }
}

module.exports = new ItemLoaders();