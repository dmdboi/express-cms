const createError = require('http-errors');
const express = require('express');
const session = require("express-session")
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require("express-handlebars");
const mongoose = require("mongoose")
const flash = require('connect-flash');
const passport = require("passport")
const fileupload = require("express-fileupload")

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dashboardRouter = require('./routes/dashboard');

const config = require('./config/env')
require("./config/passport")

mongoose.connect(config.mongoIP + config.mongoCollection, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", function() {
  console.log(
    "Mongoose default connection is open to", config.mongoIP + config.mongoCollection) // Move mongoURLS to config.js
});

var app = express();

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/blog',
    collection: 'sessions'
});

// view engine setup
app.engine(".hbs", exphbs({ defaultLayout: "layout", extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: config.cookieSecret,
    resave: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 }, //2 day cookie
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash())
app.use(fileupload())

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  res.locals.messages = req.flash()
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.port)
