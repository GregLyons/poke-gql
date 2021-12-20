const DataLoader = require('dataloader');
const {
  batchGens,
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');


class FieldState {
    
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

  activatesAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'ability', 'field_state_activates_ability', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  activatesItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'item', 'field_state_activates_item', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  boostsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'field_state_boosts_ptype', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  causesStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'status', 'field_state_causes_pstatus', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  createdByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ability_creates_field_state', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  createdByMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'fieldState', 'pmove_creates_field_state', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }
  
  effect(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'effect', 'field_state_effect', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  enhancesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'move', 'field_state_enhances_pmove', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  extendedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'item_extends_field_state', true];

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

  hindersMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'move', 'field_state_hinders_pmove', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  ignoredByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ability_ignores_field_state', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  ignoredByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'item_ignores_field_state', true];

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
    const databaseInfo = [pagination, filter, 'fieldState', 'stat', 'field_state_modifies_stat', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  preventedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ability_prevents_field_state', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  removedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ability_removes_field_state', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  removedByMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'fieldState', 'pmove_removes_field_state', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'item_resists_field_state', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistsStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'status', 'field_state_prevents_pstatus', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  resistsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'field_state_resists_ptype', false];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  suppressedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ability_suppresses_field_state', true];

    return { 
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    };
  }

  weatherBall(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'weather_ball', false]

    return {
      loader: new DataLoader(junctionBatcher(databaseInfo)),
      counter: new DataLoader(junctionBatcherCount(databaseInfo))
    }
  }
}

module.exports = new FieldState();