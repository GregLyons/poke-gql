const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
  basicJunctionBatcherCount,
} = require('./helpers.js');

class Item {
  activatedByFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'item', 'activates', true];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  boostsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'type', 'boosts', false];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  boostsUsageMethod(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'usageMethod', 'boosts', false];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  causesStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'status', 'causes', false];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }
  
  effect(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'effect', '', false];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }
  
  enablesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'item', 'requires', true];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  enablesPokemon(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'item', 'requires', true];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  extendsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'extends', false];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  generation(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  }

  ignoresFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'ignores', false];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  introduced(pagination, filter) {
    return new DataLoader(batchGens(pagination, filter));
  }

  modifiesStat(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'stat', 'modifies', false];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  // TODO
  naturalGift(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'type', 'natural_gift'))
  }

  resistsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'fieldState', 'resists', false];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  resistsStatus(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'status', 'resists', false];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  resistsType(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'type', 'resists', false];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }

  resistsUsageMethod(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'usageMethod', 'resists', false];

    if (!this.loader) {
      this.loader = new DataLoader(basicJunctionBatcher(databaseInfo))
    }
    if (!this.counter) {
      this.counter = new DataLoader(basicJunctionBatcherCount(databaseInfo))
    }
    return { 
      loader: this.loader,
      counter: this.counter,
    };
  }
}

module.exports = new Item();