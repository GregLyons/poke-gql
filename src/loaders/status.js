const DataLoader = require('dataloader');
const {
  batchGens,
  basicJunctionBatcher,
  basicJunctionBatcherCount,
} = require('./helpers.js');

class Status {
  causedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'status', 'causes', true];

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

  causedByItem(pagination, filter) {
    const databaseInfo = [pagination, filter, 'item', 'status', 'causes', true];

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

  causedByMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'status', 'causes', true];

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

  introduced(pagination, filter) {
    if (!this.loader) {
      this.loader = new DataLoader(batchGens(pagination, filter))
    }
    return { 
      loader: this.loader,
    };
  }
  
  resistedByAbility(pagination, filter) {
    const databaseInfo = [pagination, filter, 'ability', 'status', 'resists', true];

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
    const databaseInfo = [pagination, filter, 'item', 'status', 'resists', true];

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

  resistedByMove(pagination, filter) {
    const databaseInfo = [pagination, filter, 'move', 'status', 'resists', true];

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

module.exports = new Status();