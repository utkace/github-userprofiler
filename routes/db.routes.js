const { Router } = require("express");
const sqlite3 = require("sqlite3").verbose();

const router = new Router();

//Initializing database
let db = new sqlite3.Database("./db/githubUsers.db", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

//route to create a table
router.get("/createTable", (req, res) => {
  let sql =
    "CREATE TABLE github_user (id INTEGER,login TEXT PRIMARY KEY, avatar_url TEXT, name TEXT NOT NULL, bio TEXT, public_repos INTEGER, public_gists INTEGER, followers INTEGER, following INTEGER)";
  db.run(sql, err => {
    if (err) {
      return console.error(err.message);
    }
    res.send("Table created!");
  });
});

module.exports = router;
