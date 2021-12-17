const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
  basicJunctionBatcherCount,
} = require('./helpers.js');

class Type {
  boostedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'type', 'boosts', true];

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

  boostedByFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'boosts', true];

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

  boostedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'type', 'boosts', true];

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
  defensiveMatchup(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'type', 'type', 'ptype_matchup', true))
  }
  
  enablesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'type', 'requires', true];

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
    if (!this.loader) {
      this.loader = new DataLoader(batchGens(pagination, filter))
    }
    return { 
      loader: this.loader,
    };
  }

  ignoresFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'type', 'fieldState', 'ignores', false];

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
    if (!this.loader) {
      this.loader = new DataLoader(batchGens(pagination, filter))
    }
    return { 
      loader: this.loader,
    };
  }
  
  move(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'type', '', true];

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
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'item', 'type', 'natural_gift', true))
  }
  
  pokemon(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'type', '', true];

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
  offensiveMatchup(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'type', 'type', 'ptype_matchup'))
  }

  removesFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'type', 'fieldState', 'removes', false];

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
  
  resistedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'type', 'resists', true];

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

  resistedByFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'fieldState', 'type', 'resists', true];

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

  resistedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'type', 'resists', true];

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

  resistsFieldState(pagination, filter) {
    const databaseInfo = [pagination, filter, 'type', 'fieldState', 'resists', false];

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

  weatherBall(pagination, filter) {
    return new DataLoader(basicJunctionBatcher(pagination, filter, 'fieldState', 'type', 'natural_gift', true))
  }
}

module.exports = new Type();