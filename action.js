const { getFromDB, addToDB, getFromCache } = require("./helper");
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

async function getUserData(usernames) {
  result = [];
  const getData = () => {
    return Promise.all(
      usernames.map(async user => {
        await getFromCache(user).then(async res => {
          if (res) {
            //if found in cache push to final result
            result.push(res);
          } else {
            //call the function to look up in DB
            await getSingleUserDatafromDB(user).then(data => {
              result.push(data);
            });
          }
        });
      })
    );
  };
  await getData();
  return result;
}
