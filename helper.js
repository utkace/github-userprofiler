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
  //get user data from the database
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
  // to add the values of user to our db
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
  //this function returns the user data from the cache
  return new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      // If that key exists in Redis store
      if (data) {
        data = JSON.parse(data);
        data.source = "cache";
        resolve(data);
      } else {
        // send error to the client
        reject("Not found in cache");
      }
    });
  });
}

function sendToCache(data, key) {
  //this function inserts the user data to the cache
  client.setex(key, 30, JSON.stringify(data));
  return data;
}

function getSingleUserDatafromAPI(user) {
  //A function to get user from github api
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`https://api.github.com/users/${user}`, {
      method: "GET"
    });

    const data = await res.json();
    if (res.status !== 200) {
      resolve({
        login: user,
        message: data.message,
        source: null
      });
    }
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
    await addToDB(data);
    console.log("added to db " + user);

    await sendToCache(data, data.login);
    console.log("added to cache " + user);
    resolve(newdata);
  });
}
//----------------------------------------

//A function wrapper to get user from the database
function getSingleUserDatafromDB(user) {
  console.log("searching " + user);
  return new Promise(async (resolve, reject) => {
    await getFromDB(user).then(async res => {
      if (res) {
        //found in database , return
        const data = await res;
        data.source = "database";
        //send to cache
        await sendToCache(data, data.login);
        console.log("added to cache " + user);
        resolve(data);
      } else {
        reject("Not found in DB");
      }
    });
  });
}
//-----------------------------------------

module.exports = {
  getFromCache,
  getSingleUserDatafromDB,
  getSingleUserDatafromAPI
};
