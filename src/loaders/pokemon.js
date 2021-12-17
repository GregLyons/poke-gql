const DataLoader = require('dataloader');
const {
  batchGens,
  junctionBatcher,
  junctionBatcherCount,
} = require('./helpers.js');

class Pokemon {
  ability(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'ability', false];
    
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
  
  enablesItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'pokemon', 'requires', true];

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

  enablesMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'pokemon', 'requires', true];

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

  evolvesFrom(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'pokemon', 'evolution', true];

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

  evolvesTo(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'pokemon', 'evolution', false];

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

  form(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'pokemon', 'form', false];

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

  introduced(pagination, filter) {
    if (!this.loader) {
      this.loader = new DataLoader(batchGens(pagination, filter))
    }
    return { 
      loader: this.loader,
    };
  }

  move(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'move', false];

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

  requiresItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'item', 'requires', false];

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

  type(pagination, filter) {
    const databaseInfo = [pagination, filter, 'pokemon', 'type', false];

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
}

module.exports = new Pokemon();