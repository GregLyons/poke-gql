const DataLoader = require('dataloader');
const {
  batchGens,
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');


class FieldState {
  activatesAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'ability', 'activates', false];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  activatesItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'item', 'activates', false];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  boostsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'boosts', false];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  causesStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'status', 'causes', false];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  createdByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'creates', true];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  createdByMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'fieldState', 'creates', true];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }
  
  effect(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'effect', '', false];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  enhancesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'move', 'enhances', false];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  extendedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'extends', true];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }
  
  generation(pagination, filter) {
    if (!this.loader) {
      this.loader = new DataLoader(batchGens(pagination, filter))
    }
    return { 
      loader: this.loader,
    };
  }

  hindersMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'move', 'hinders', false];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  ignoredByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'ignores', true];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  ignoredByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'ignores', true];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }
  
  introduced(pagination, filter) {
    if (!this.loader) {
      this.loader = new DataLoader(batchGens(pagination, filter))
    }
    return { 
      loader: this.loader,
    };
  }
  
  modifiesStat(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'stat', 'modifies', false];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  preventedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'prevents', true];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  removedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'removes', true];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  removedByMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'fieldState', 'removes', true];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  resistedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'resists', true];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  resistsStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'status', 'resists', false];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  resistsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'resists', false];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  suppressedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'fieldState', 'suppresses', true];

    if (!this.loader) {
      this.loader = new DataLoader(junctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(junctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  weatherBall(pagination, filter) {
    return new DataLoader(junctionBatcher(pagination, filter, 'fieldState', 'type', 'weather_ball'))
  }
}

module.exports = new FieldState();