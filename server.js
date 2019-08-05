const express = require("express");
const path = require("path");
const SetupRoutes = require("./routes/components.js");

const app = express(); //setup express

SetupRoutes(app); //setup routes

if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen("5000", () => {
  console.log("Server started on port 5000");
}); //backend runs on port 5000
