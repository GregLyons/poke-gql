const {
  LoadersForEntity,
} = require('./helpers.js');

class VersionGroupLoaders extends LoadersForEntity {
  
  constructor() {
    super();
  }

  description(pagination, filter) {
    return [pagination, filter, 'versionGroup', 'description', 'version_group_pdescription', false];
  }

  }

module.exports = new VersionGroupLoaders();