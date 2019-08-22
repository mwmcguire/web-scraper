// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Create article schema
var articleSchema = new Schema({
  title: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  link: { type: String, required: true, unique: true },
  date: { type: Date },
  saved: { type: Boolean, default: false }
});

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;