const express = require("express");

const app = express(); //setup express

app.listen("5000", () => {
  console.log("Server started on port 5000");
}); //backend runs on port 5000
