const {
  LoadersForEntity,
} = require('./helpers.js');

class UsageMethodLoaders extends LoadersForEntity {
  
  constructor() {
    super();
  }

  activatesAbility(pagination, filter) {
    return [pagination, filter, 'usageMethod', 'ability', 'usage_method_activates_ability', false];
  }

  activatesItem(pagination, filter) {
    return [pagination, filter, 'usageMethod', 'item', 'usage_method_activates_item', false];
  }

  boostedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'usageMethod', 'ability_boosts_usage_method', true];
  }

  boostedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'usageMethod', 'item_boosts_usage_method', true];
  }

  move(pagination, filter) {
    return [pagination, filter, 'move', 'usageMethod', 'pmove_usage_method', true];
  }

  preventedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'usageMethod', 'ability_prevents_usage_method', true];
  }

  preventedByMove(pagination, filter) {
    return [pagination, filter, 'move', 'usageMethod', 'pmove_prevents_usage_method', true];
  }
  
  resistedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'usageMethod', 'ability_resists_usage_method', true];
  }

  resistedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'usageMethod', 'item_resists_usage_method', true];
  }
}

module.exports = new UsageMethodLoaders();