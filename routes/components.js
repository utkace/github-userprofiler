const DBRoutes = require("./db.routes");
const UserRoutes = require("./user.routes");

//A function to setup all routes
const SetupRoutes = app => {
  app.use("/api/db", DBRoutes);
  app.use("/api/user", UserRoutes);
};

module.exports = SetupRoutes;
