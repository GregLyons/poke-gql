const {
  entityNameToTableName,
  getFilterQueryString,
  getPaginationQueryString,
  hasGenID,
} = require('./helpers.js');

const getEntityQueryString = (entityName, pagination, filter) => {
  tableName = entityNameToTableName(entityName);

  // These functions escape strings to prevent SQL injection.
  filterString = getFilterQueryString(filter, tableName);
  paginationString = getPaginationQueryString(pagination, tableName);

  return `
    SELECT * FROM ${tableName}
    ${
      hasGenID(tableName) 
        ? `WHERE generation_id = ?`
        : ''
    }
    ${filterString}
    ${paginationString}
  `;
}

const getEntityCountQueryString = (entityName, filter) => {
  tableName = entityNameToTableName(entityName);

  // These functions escape strings to prevent SQL injection.
  filterString = getFilterQueryString(filter, tableName);

  return `
    SELECT COUNT(*) AS row_count FROM ${tableName}
    ${
      hasGenID(tableName) 
        ? `WHERE generation_id IN ?`
        : ''
    }
    ${filterString}
  `;
}

const getEntityByColumnQueryString = (entityName, keyName, columnValues) => {
  tableName = entityNameToTableName(entityName);

  let columnName;
  if (tableName === 'generation' && keyName === 'number') {
    columnName = 'id';
  }
  else if (tableName === 'pdescription' && keyName.includes('names')) {
    columnName = 'entity_' + keyName.replace('names', 'name');
  }
  else if (keyName.includes('names')) {
    columnName = keyName.replace('names', 'name');
  }
  else if (keyName.includes('psID')) {
    columnName = 'ps_id';
  }
  else if (keyName.includes('unformattedName')) {
    columnName = 'unformatted_name';
  }
  else {
    columnName = keyName;
  }

  // If singular value passed, convert to array
  if (!Array.isArray(columnValues)) columnValues = [columnValues];

  return `
    SELECT * FROM ${tableName}

    ${
      hasGenID(tableName) 
        ? `WHERE generation_id IN ?`
        : ''
    }
    
    ${
      hasGenID(tableName)
        ? `AND ${tableName}_${columnName} IN (${(columnValues
          .map(value => 
          "'" + value.toString().toLowerCase() + "'")
          )
          .join(', ')
        })`
        : `WHERE ${tableName}_${columnName} IN (${(columnValues
          .map(value => 
          "'" + value.toString().toLowerCase() + "'")
          )
          .join(', ')
        })`
    }
  `;
}

module.exports = {
  getEntityQueryString,
  getEntityCountQueryString,
  getEntityByColumnQueryString,
}