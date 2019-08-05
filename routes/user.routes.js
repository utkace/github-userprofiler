const { Router } = require("express");
var bodyParser = require("body-parser");
const getUserData = require("../action");
const router = new Router();

//using bodyParser to get data from the body of the request
router.use(bodyParser.json());

router.post("/getUsers", (req, res) => {
  console.log(req.body);
  try {
    const usernames = req.body.query.usernames;
    getUserData(usernames).then(data => {
      res.status(200).send(data);
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ message: "Sorry, something went wrong please try again later." });
  }
});

module.exports = router;
