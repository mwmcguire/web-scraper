var express = require("express");
var handlebars = require("express-handlebars");
var logger = require("morgan");
var path = require("path");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/layouts/partials")
  })
);
app.set("view engine", "handlebars");

// Require routes from controller
require("./controllers/controller.js")(app);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
