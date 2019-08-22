var express = require("express");
var handlebars = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

var PORT = process.env.PORT || 3000;

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Require routes from controller
require("./controllers/controller.js")(app);

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("mongoose connection is successful");
  }
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));