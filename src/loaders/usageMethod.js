const {
  getGenLoader,

  LoadersForEntity,
} = require('./helpers.js');

class UsageMethod extends LoadersForEntity {
  
  constructor() {
    super();
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
  
  resistedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'usageMethod', 'ability_resists_usage_method', true];
  }

  resistedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'usageMethod', 'item_resists_usage_method', true];
  }
}

module.exports = new UsageMethod();