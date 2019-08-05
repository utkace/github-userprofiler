const sqlite3 = require("sqlite3").verbose();
const redis = require("redis");

//Initializing database
let db = new sqlite3.Database("./db/githubUsers.db", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

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

function getFromDB(user) {
  let sql = `SELECT *
  FROM github_user
  WHERE login = ?`;

  return new Promise((resolve, reject) => {
    db.get(sql, [user], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function addToDB(data) {
  // to add the values of users to our db
  db.run(
    `INSERT INTO github_user VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.id,
      data.login,
      data.avatar_url,
      data.name,
      data.bio,
      data.public_repos,
      data.public_gists,
      data.followers,
      data.following
    ],
    err => {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with id ${data.id}`);
    }
  );
}

function getFromCache(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      // If that key exists in Redis store
      if (data) {
        data = JSON.parse(data);
        data.source = "cache";
        resolve(data);
      } else {
        getSingleUserDatafromDB(key)
          .then(data => {
            sendToCache(data, key);
            resolve(data);
          })
          .catch(error => {
            // log error message
            console.log(error);
            // send error to the client
            reject(error.toString());
          });
      }
    });
  });
}

function sendToCache(data, key) {
  client.setex(key, 30, JSON.stringify(data));
  return data;
}

module.exports = {
  getFromDB,
  addToDB,
  getFromCache
};
