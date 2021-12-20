const {
  getGenLoader,

  LoadersForEntity,
} = require('./helpers.js');

class Description extends LoadersForEntity {
  
  constructor() {
    super();
  }

  ability(pagination, filter) {
    return [pagination, filter, 'description', 'ability', 'pdescription_ability', false];
  }

  item(pagination, filter) {
    return [pagination, filter, 'description', 'item', 'pdescription_item', false];
  }
  
  move(pagination, filter) {
    return [pagination, filter, 'description', 'move', 'pdescription_pmove', false];
  }

  versionGroup(pagination, filter) {
    return [pagination, filter, 'versionGroup', 'description', 'version_group_pdescription', true];
  }
}

module.exports = new Description();