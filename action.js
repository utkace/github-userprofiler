const {
  getFromCache,
  getSingleUserDatafromDB,
  getSingleUserDatafromAPI
} = require("./helper");

async function getUserData(usernames) {
  result = [];
  console.log("start ", usernames);
  const getData = () => {
    return Promise.all(
      usernames.map(async user => {
        console.log("At " + user);
        await getFromCache(user)
          .then(async res => {
            //if found in cache push to final result
            console.log("got from cache " + user);
            result.push(res);
          })
          .catch(async err => {
            console.log("ERROR : ", err);
            //call the function to look up in DB
            await getSingleUserDatafromDB(user)
              .then(data => {
                console.log("Got " + user);
                result.push(data);
              })
              .catch(async err => {
                console.log("ERROR : ", err);
                //call the function to call the API
                await getSingleUserDatafromAPI(user).then(data => {
                  console.log("got from api " + user);
                  result.push(data);
                });
              });
          });
      })
    );
  };
  await getData();
  console.log("returning " + result.map(el => el.login));
  return result;
}

module.exports = getUserData;
