const {
  getFromCache,
  getSingleUserDatafromDB,
  getSingleUserDatafromAPI
} = require("./helper");

async function getUserData(usernames) {
  //this function iterates over the array of input and returns the result as an array of userdata
  result = [];
  console.log("start ", usernames);
  const getData = () => {
    return Promise.all(
      usernames.map(async user => {
        console.log("At " + user);
        await getFromCache(user)
          .then(async res => {
            //if found in cache push to final result
            result.push(res);
          })
          .catch(async err => {
            //call the function to look up in DB
            await getSingleUserDatafromDB(user)
              .then(data => {
                result.push(data);
              })
              .catch(async err => {
                //call the function to call the API
                await getSingleUserDatafromAPI(user).then(data => {
                  result.push(data);
                });
              });
          });
      })
    );
  };
  await getData();
  return result;
}

module.exports = getUserData;
