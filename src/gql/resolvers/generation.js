/* 
  Resolvers for Generation.

  db is a mysql2 database instance. 

  The 'generation' table has columns:
    'generation_id' (PK), corresponding to genNumber.
    'generation_code', corresponding to genCode.
*/

// Query
/*
    generationByID(id)
    generationByNumber(number)
    generationByCode(code)
    generations(cursor, limit)
*/
//#region

const generationByNumber = async (parent, args, context, info) => {
  const results = await context.db.promise().query(
    `
      SELECT * FROM generation
      WHERE generation_id = ${args.number}
    `
  )
  .catch(console.log)
  return results[0][0];
};

const generationByCode = async (parent, args, context, info) => {
  args.code = args.code.toUpperCase();

  const results = await context.db.promise().query(
    `
      SELECT * FROM generation
      WHERE generation_code = '${args.code}'
    `
  )
  .catch(console.log)

  return results[0][0];
};

// TODO: cursor
const generations = async (parent, args, context, info) => {
  const results = await context.db.promise().query(
    `
      SELECT * FROM generation
    `
  )
  .catch(console.log)

  return results[0];
};

const Query = {
  generationByNumber,
  generationByCode,
  generations,
}

//#endregion

// Generation
/*
    id
    abilities(input)
    genCode
    genNumber
    items(input)
    moves(input)
    pokemon(input)
    types(input)
*/
//#region

const genCode = async (parent, args, context, info) => {
  return parent.generation_code;
}

const genNumber = async (parent, args, context, info) => {
  return parent.generation_id;
}

const Generation = {
  genCode,
  genNumber,
}

//#endregion

module.exports = {
  Query,
  Generation,
}