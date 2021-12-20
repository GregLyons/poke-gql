const {
  getGenLoader,

  LoadersForEntity,
} = require('./helpers.js');

class VersionGroup extends LoadersForEntity {
  
  constructor() {
    super();
  }

  description(pagination, filter) {
    return [pagination, filter, 'versionGroup', 'description', 'version_group_pdescription', false];
  }

  }

module.exports = new VersionGroup();