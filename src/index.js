require('dotenv').config();
/*
  Set up poke_gql database.
*/
const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 30,
  connectTimeout: 20000,
});

db.promise().query(`SELECT * FROM generation`)
  .then( ([results, fields]) => {
    console.log(results);
    console.log(fields);
  })
  .catch(console.log);

/*
  Set up GraphQL Server.
*/
const { ApolloServer } = require('apollo-server');

const { schema } = require('./gql/index.js');

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    ...req,
    db,
  })
})

server
  .listen()
  .then(({ url }) => 
    console.log(`Server is running on ${url}.`)
  );