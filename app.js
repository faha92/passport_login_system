const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');


const app = express();

//db config

const db = require('./config/keys').mongoURI;

//connect to Mongo

mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('mongodb connected')).catch(err => console.log(err));


// ejs

app.use(expressLayouts);
app.set("view engine", "ejs");

// parser

app.use(express.urlencoded({extented: false}));

// Routes

app.use("/", require("./routes/index"));

app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
