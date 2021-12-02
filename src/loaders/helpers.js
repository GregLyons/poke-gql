// 'pagination' is an object with 'limit', 'offset', 'orderBy', 'sortBy', and 'search' keys.
const getPaginationQueryString = (pagination, tableName) => {
  const {limit, offset, orderBy, sortBy, search} = pagination;

  const limitOffsetString = `LIMIT ${offset}, ${limit}`;
  // Most columns, except 'generation_id' and 'introduced' are preceded by the table name.
  const sortString = orderBy === 'introduced' || orderBy === 'generation_id'
    ? `ORDER BY ${orderBy} ${sortBy}`
    : `ORDER BY ${tableName}_${orderBy} ${sortBy}`;
  const searchString = search 
    ? `AND ${tableName}_formatted_name LIKE %${search}%`
    : '';

  return `
    ${searchString}
    ${sortString}
    ${limitOffsetString}
  `
}

module.exports = {
  getPaginationQueryString,
}