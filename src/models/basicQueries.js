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
        ? `WHERE generation_id IN ?`
        : ''
    }
    ${filterString}
    ${paginationString}
  `;
}

const getEntityByColumnQueryString = (entityName, keyName, columnValue) => {
  tableName = entityNameToTableName(entityName);

  let columnName;
  if (tableName === 'generation' && keyName === 'number') {
    columnName = 'id';
  }
  else {
    columnName = keyName;
  }

  return `
    SELECT * FROM ${tableName}

    ${
      hasGenID(tableName) 
        ? `WHERE generation_id IN ?`
        : ''
    }
    
    ${
      hasGenID(tableName)
        ? `AND ${tableName}_${columnName} = '${columnValue.toString().toLowerCase()}'`
        : `WHERE ${tableName}_${columnName} = '${columnValue.toString().toLowerCase()}'`
    }
  `;
}

module.exports = {
  getEntityQueryString,
  getEntityByColumnQueryString,
}