const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const redis = require("redis");

// create and connect redis client to local instance.
const client = redis.createClient(
  "redis://h:p72fc864113c1bec4e6ffeed160f944e171392e161e056414b88cdf3b80a1c499@ec2-54-162-141-93.compute-1.amazonaws.com:29479"
);

//connecting to redis
client.on("connect", () => {
  console.log("cache connected!");
});

client.on("error", err => {
  console.log(err);
});

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
