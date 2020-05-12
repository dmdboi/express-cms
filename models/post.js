var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: Array,
  image: String,
  created_At: String,
  markdown: String,
  slug: String,
  public: {type: Boolean, default: true},
  published: String,
  archived: String
});

module.exports = mongoose.model("Post", postSchema);
