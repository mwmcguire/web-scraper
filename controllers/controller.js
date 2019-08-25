// Require Axios: Makes HTTP request for HTML page
var axios = require("axios");
// Require Cheerio: Parses HTML and helps find elements
var cheerio = require("cheerio");
var mongoose = require("mongoose");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("mongoose connection is successful");
  }
});

var db = require("../models");

module.exports = function(app) {
  // Render the homepage
  app.get("/", function(req, res) {
    res.render("home");
  });

  app.get("/articles", function(req, res) {
    axios.get("http://quotes.toscrape.com/").then(function(response) {
      var $ = cheerio.load(response.data);

      var results = [];

      $(span.text).each(function(i, element) {
        var title = $(element).text();

        results.push({
          title: title
        });
      });

      console.log(results);
    });
  });
};
