"use strict"
const mySQL = require("mysql");
require("dotenv").config();
const userModel = require("../models/user.model")

const db = mySQL.createConnection({
   host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

async function connectToDatabase() {
  //Connect to db
 await db.connect((err) => {
    if (err) {
      console.log("Connection to database failed!");
      throw err;
    }
    console.log(`Successfully connected to database.`);
    db.query(userModel.createTable, function (err, result) {
      if (err) {
        throw err;
      }
      console.log(`Table created`);
    });
  });
}

module.exports = { connectToDatabase, db };
