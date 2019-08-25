// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Create note schema
var CommentSchema = new Schema({
  titleId: {
    type: Schema.Types.ObjectId
    // ref: Article
  },
  body: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create model from the above schema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the model
module.exports = Comment;
