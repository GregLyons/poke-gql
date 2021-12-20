const DataLoader = require('dataloader');
const {
  batchGens,
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');

class Ability {
  
  loaders = {};

  load(key, id, pagination, filter, countMode) {
    const loader = this.findLoader(key, pagination, filter, countMode);
    return loader.load(id);
  }

  clearLoaders() {
    this.loaders = {};
  }

  findLoader(key, pagination, filter, countMode) {
    if (!this.loaders[key]) {
      this.loaders[key] = this[key](pagination, filter);
    }
    return countMode 
      ? this.loaders[key].counter
      : this.loaders[key].loader;
  }

  activatedByFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'ability', 'field_state_activates_ability', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  boostsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'type', 'ability_boosts_ptype', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  boostsUsageMethod(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'usageMethod', 'ability_boosts_usage_method', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  causesStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'status', 'ability_causes_pstatus', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  createsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ability_creates_field_state', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  description(pagination, filter) {
    const databaseInfo = [pagination, filter, 'description', 'ability', 'pdescription_ability', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  effect(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'effect', 'ability_effect', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  generation(pagination, filter) {
    return {
      loader: new DataLoader(batchGens(pagination, filter))
    }
  }

  ignoresFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ability_ignores_field_state', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  introduced(pagination, filter) {
    return {
      loader: new DataLoader(batchGens(pagination, filter))
    }
  }
  
  modifiesStat(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'stat', 'ability_modifies_stat', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  pokemon(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'ability', 'pokemon_ability', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  preventsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ability_prevents_field_state', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  removesFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ability_removes_field_state', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistsStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'status', 'ability_resists_pstatus', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'type', 'ability_resists_ptype', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistsUsageMethod(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'usageMethod', 'ability_resists_usage_method', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  suppressesFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ability_suppresses_field_state', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
}

module.exports = new Ability();