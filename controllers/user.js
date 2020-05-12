var User = require("../models/user")
var bcrypt = require("bcrypt");
var passport = require("passport")

//------------------------------
//          SIGN UP ROUTES
//------------------------------
exports.getSignup = (req, res) => {
    res.render("users/signup", {title: "Sign up"})
}

exports.postSignup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            created_At: Date.now()
        });
        user.save((err, result) => {
            if (err) {
                console.log(err)
            } else {
                req.flash('success', {msg: 'User succesfully created.'})
                res.redirect("/users/login")
            }
        })
    } catch(e) {
        console.log(e)
        res.redirect("/users/signup")
    }
}

//------------------------------
//          LOGIN ROUTES
//------------------------------
exports.getLogin = (req, res) => {
    res.render("users/login", { title: "Login" })
}

exports.postLogin = (req, res, next) => {
    passport.authenticate("local.signin", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req, res, next)
}

//------------------------------
//          LOGOUT ROUTE
//------------------------------
exports.logout = async (req, res) => {
    req.logOut();
    req.flash('success', 'See you soon!')
    res.redirect("/users/login");
}

