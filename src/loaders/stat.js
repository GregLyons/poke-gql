const {
  getGenLoader,

  LoadersForEntity,
} = require('./helpers.js');

class Stat extends LoadersForEntity {
  
  constructor() {
    super();
  }
  
  modifiedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'stat', 'ability_modifies_stat', true];
  }

  modifiedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'stat', 'field_state_modifies_stat', true];
  }

  modifiedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'stat', 'item_modifies_stat', true];
  }

  modifiedByMove(pagination, filter) {
    return [pagination, filter, 'move', 'stat', 'pmove_modifies_stat', true];
  }
}

module.exports = new Stat();