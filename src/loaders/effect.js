const {
  getGenLoader,

  LoadersForEntity,
} = require('./helpers.js');

class Effect extends LoadersForEntity {
  
  constructor() {
    super();
  }
  
  ability(pagination, filter) {
    return [pagination, filter, 'ability', 'effect', 'ability_effect', true];
  }

  fieldState(pagination, filter) {
    return [pagination, filter, 'fieldState', 'effect', 'field_state_effect', true];
  }
  
  item(pagination, filter) {
    return [pagination, filter, 'item', 'effect', 'item_effect', true];
  }

  move(pagination, filter) {
    return [pagination, filter, 'move', 'effect', 'pmove_effect', true];
  }
}

module.exports = new Effect();