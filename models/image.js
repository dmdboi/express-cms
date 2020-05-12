var mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
    name: String,
    url: String,
    markdown: String
});

module.exports = mongoose.model("Image", imageSchema);
