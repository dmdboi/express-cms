const LocalStrategy = require("passport-local").Strategy
const passport = require("passport")
const User = require("../models/user")

passport.use(
    "local.signin",
    new LocalStrategy({
        usernameField: "email",
        passportField: "password",
        passReqToCallback: true
    }, function(req, email, password, done) {
        User.findOne({ email: email}, function(err, user) {
            if (err) {
                console.log(err)
                return done(err);
            }
            if (!user) {
                console.log("No user found.")
                return done(null, false)
            }
            if (!user.validPassword(password)) {
                req.flash('error', 'Wrong password');
                return done(null, false)
            }
            console.log("logged in")
            req.flash('success', 'Welcome back!');
            return done(null, user)
        })
    })
)

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user)
})