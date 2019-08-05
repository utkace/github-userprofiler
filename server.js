const express = require("express");

const SetupRoutes = require("./routes/components.js");

const app = express(); //setup express

SetupRoutes(app); //setup routes

app.listen("5000", () => {
  console.log("Server started on port 5000");
}); //backend runs on port 5000
