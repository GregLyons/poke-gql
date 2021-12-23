# Purpose

This code defines a GraphQL API, to be used in Pokemon apps. It runs with Apollo Server with a [MySQL database](https://github.com/GregLyons/poke-db) on the backend.

If you want to add data to this project, I have written out a detailed example on doing so across these `README.md` files in the [repo for the database](https://github.com/GregLyons/poke-db), as well as in this repo. I have organized my code so as to facilitate inserting new data, and several of the conventions I have employed in processing the data are to this end. These are described in the appropriate `README.md` file.

`src/README.md` describes the overall structure of this repository.

# Quick setup

Currently I do not have the finds or expertise to host this API (for example, there's no security in place restricting what users can query). Once you've [set up the MySQL database](https://github.com/GregLyons/poke-db), running this API on your own machine is easy:

1. Write a `.env` file in this directory with the same database credentials you used for setting up the MySQL database (exact same format).
2. Run `npm start` in this folder. You should then get the message `Server is running on http://localhost:4000/`, where you can run GraphQL queries.