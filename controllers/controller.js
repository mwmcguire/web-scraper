var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

// var db = require("../models");

module.exports = function (app) {
  // Render the homepage
  app.get("/", function (req, res) {
    res.render("home");
  });
}