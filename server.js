const express = require("express");
const redis = require("redis");
const SetupRoutes = require("./routes/components.js");

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

const app = express(); //setup express

SetupRoutes(app); //setup routes

app.listen("5000", () => {
  console.log("Server started on port 5000");
}); //backend runs on port 5000
