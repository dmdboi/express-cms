var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new Schema({
    username: String,
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    created_At: { type: Date, required: true},
    isAdmin: { type: Boolean, default: true},
    role: { type: String, default: "admin"},
    image: String
})

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model("User", userSchema);