const {
  getGenLoader,

  LoadersForEntity,
} = require('./helpers.js');

class Status extends LoadersForEntity {
  
  constructor() {
    super();
  }

  causedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'status', 'ability_causes_pstatus', true];
  }

  causedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'status', 'field_state_causes_pstatus', true];
  }

  causedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'status', 'item_causes_pstatus', true];
  }

  causedByMove(pagination, filter) {
    return [pagination, filter, 'move', 'status', 'pmove_causes_pstatus', true];
  }
  
  resistedByAbility(pagination, filter) {
    return [pagination, filter, 'ability', 'status', 'ability_resists_pstatus', true];
  }

  resistedByFieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'status', 'field_state_prevents_pstatus', true];
  }

  resistedByItem(pagination, filter) {
    return [pagination, filter, 'item', 'status', 'item_resists_pstatus', true];
  }

  resistedByMove(pagination, filter) {
    return [pagination, filter, 'move', 'status', 'pmove_resists_pstatus', true];
  }
}

module.exports = new Status();