const express = require("express");
const sqlite3 = require("sqlite3").verbose();

//Initializing database
let db = new sqlite3.Database("./db/githubUsers.db", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

const app = express(); //setup express

app.listen("5000", () => {
  console.log("Server started on port 5000");
}); //backend runs on port 5000
