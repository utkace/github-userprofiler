const redis = require("redis");
// create and connect redis client to local instance.

const client = redis.createClient(require("./keys").REDIS_URL);

//connecting to redis
client.on("connect", () => {
  console.log("cache connected!");
});

client.on("error", err => {
  console.log(err);
});

module.exports = client;
