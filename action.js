const { getFromCache } = require("./helper");

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

module.exports = getUserData;
