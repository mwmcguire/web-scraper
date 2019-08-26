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
    res.render("index");
  });

  // Route for getting all Articles from the db
  app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.get("/scrape", function(req, res) {
    console.log("scrapping...");
    // Get HTML body
    axios
      .get("https://pcper.com/category/news-article/")
      .then(function(response) {
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
          var date = $(element)
            .find("div.post-meta")
            .children("p")
            .children("span.updated")
            .text();
          // var image = $(element)
          //   .find("a.featured-image")
          //   .children("source");

          // console.log("headline:" + headline);
          // console.log("url: " + url);
          // console.log("summary: " + summary);
          console.log("date: " + date);

          result.headline = headline;
          result.url = url;
          result.summary = summary;
          result.date = date;

          db.Article.create(result)
            .then(function(dbArticle) {
              console.log("creating article: " + dbArticle);
            })
            .catch(function(err) {
              console.log(err);
            });
        });

        // Send a message to the client
        res.send("Scrape Complete");
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
