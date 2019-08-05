const sqlite3 = require("sqlite3").verbose();
const fetch = require("node-fetch");
const client = require("./configs/redis.config");

//Initializing database
let db = new sqlite3.Database("./db/githubUsers.db", err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
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

//A function to get user from github api
function getSingleUserDatafromAPI(user) {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`https://api.github.com/users/${user}`, {
      method: "GET"
    });

    const data = await res.json();
    const newdata = {
      id: data.id,
      login: data.login,
      avatar_url: data.avatar_url,
      name: data.name,
      bio: data.bio,
      public_repos: data.public_repos,
      public_gists: data.public_gists,
      followers: data.followers,
      following: data.following,
      source: "api"
    };
    resolve(newdata);
  });
}
//----------------------------------------

//A function to get user from the database
function getSingleUserDatafromDB(user) {
  result = [];
  return new Promise(async (resolve, reject) => {
    const res = await getFromDB(user).then(async res => {
      if (res) {
        //found in database , return
        const data = await res;
        data.source = "database";
        resolve(data);
      } else {
        //call the function to call the API
        await getSingleUserDatafromAPI(user).then(data => {
          addToDB(data);
          resolve(data);
        });
      }
    });
  });
}
//-----------------------------------------

module.exports = {
  getFromCache
};
