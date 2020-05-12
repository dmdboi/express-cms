var mongoose = require("mongoose");

var newsletterSchema = new mongoose.Schema({
    email: String,
    created_At: String
});

module.exports = mongoose.model("Newsletter", newsletterSchema);
