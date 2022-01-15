# Purpose

This code defines a GraphQL API, to be used in Pokemon apps. It runs with Apollo Server with a [MySQL database](https://github.com/GregLyons/poke-db) on the backend.

If you want to add data to this project, I have written out a detailed example on doing so across these `README.md` files in the [repo for the database](https://github.com/GregLyons/poke-db), as well as in this repo. I have organized my code so as to facilitate inserting new data, and several of the conventions I have employed in processing the data are to this end. These are described in the appropriate `README.md` file.

`src/README.md` describes the overall structure of this repository.

# Quick setup

Currently I do not have the finds or expertise to host this API (for example, there's no security in place restricting what users can query). Once you've [set up the MySQL database](https://github.com/GregLyons/poke-db), running this API on your own machine is easy:

1. Write a `.env` file in this directory with the same database credentials you used for setting up the MySQL database (exact same format).
2. Run `npm start` in this folder. You should then get the message `Server is running on http://localhost:4000/`, where you can run GraphQL queries.

# Future goals

1. **Add filters for `Edge`s**: For example, in the `moves` field for a `Pokemon`, one could pass in `edgeFilter: { learnMethods: ["M", "T"] }` to select only `PokemonMoveEdge`s corresponding to `Move`s learned via TM/HM or via Move Tutor.
2. **Optimize database queries**: Currently, queries against the MySQL backend use `SELECT * FROM` for the majority of queries. Most columns are relatively narrow, since they mainly consist of `SMALLINT`s or `TINYINT`s, but of course the user won't always request from every column in a table. The `info` argument to the resolvers contains information on the fields actually being requested in a given query. I haven't yet done a performance analysis to identify bottlenecks in querying (other factors including setting up a connection to the database, network latency, etc.) to determine whether using a more specific `SELECT` statement would significantly speed up queries.

# Bug fixes

Fixed a bug in `models/helpers.js` for `extraFilterString` on items. 

Added description fields to Effect and Status.