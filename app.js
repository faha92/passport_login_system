const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// passport config
require("./config/passport");

const app = express();

//db config

const db = require("./config/keys").mongoURI;

//connect to Mongo

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// ejs

app.use(expressLayouts);
app.set("view engine", "ejs");

// parser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// passportjs middleware

app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes

app.use("/", require("./routes/index"));

app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
