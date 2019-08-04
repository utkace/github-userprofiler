const DBRoutes = require("./db.routes");

//A function to setup all routes
const SetupRoutes = app => {
  app.use("/api/db", DBRoutes);
};

module.exports = SetupRoutes;
