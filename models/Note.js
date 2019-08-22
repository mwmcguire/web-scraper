// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Create note schema
var noteSchema = new Schema({
  titleId: { type: Schema.Types.ObjectId, ref: Article },
  body: { type: String },
  date: { type: Date, default: Date.now }
});

var Note = mongoose.model("Article", noteSchema);

module.exports = Note;