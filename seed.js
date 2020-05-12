var User = require("./models/user")
var bcrypt = require("bcrypt");
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function main() {
    const hashedPassword = await bcrypt.hash("password", 10)
    const user = new User({
        email: "max@test.com",
        password: hashedPassword,
        created_At: Date.now()
    });
    
    user.save((err, result) => {
        if (err) {
            console.log(err)
        } 
        if (result) {
            console.log("User added")
        }
    })
}

main()
