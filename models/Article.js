// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date
  },
  saved: {
    type: Boolean,
    default: false
  }
});

// Create model from the above schema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
