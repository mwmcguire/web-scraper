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
  var articles = [];
  // Route to get all Articles
  app.get("/", function(req, res) {
    db.Article.find({}).then(function(error, data) {
      var hbsObject = { article: data };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  app.get("/scrape", function(req, res) {
    console.log("scrapping...");
    // Get HTML body
    axios
      .get("https://pcper.com/category/news-article/")
      .then(function(response) {
        console.log("inside axios.get");
        var $ = cheerio.load(response.data);

        // Get every h2 within article tag
        $("article").each(function(i, element) {
          var result = {};

          // Get the text and href of every link, save them as properties of the result object.
          var headline = $(element)
            .find("h2.post-title")
            .text();
          var url = $(element)
            .find("h2.post-title")
            .children("a")
            .attr("href");
          var summary = $(element)
            .find("div.excerpt")
            .children("p")
            .text();
          // var image = $(element)
          //   .find("a.featured-image")
          //   .children("source");

          console.log("headline:" + headline);
          console.log("url: " + url);
          console.log("summary: " + summary);

          result.headline = headline;
          result.url = url;
          result.summary = summary;

          articles.push(result);
        });

        // Alert the client if the scrape was completed:
        res.render("index", { articles: articles });
      });
  });

  // Route to save an Article
  app.post("/saved/:id", function(req, res) {
    // Update the Article's boolean "saved" state to "true"
    db.Article.update({ _id: req.params.id }, { saved: true })
      .then(function(result) {
        res.json(result);
      })
      .catch(function(error) {
        res.json(error);
      });
  });
};
