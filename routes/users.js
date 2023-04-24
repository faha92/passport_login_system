const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// user model
const User = require('../models/users');

// LOGING PAGEs
router.get("/login", (req, res) => res.render("login"));

// REGISTER PAGE
router.get("/register", (req, res) => res.render("register"));

// register handle
router.post("/register", (req, res) => {
  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  const password2 = req.body.password2.trim();

  // validation
  let errors = [];

  // check required fields
  if (!name || !email || !password) {
    errors.push({ msg: "All fields are required" });
  }

  // check if email is valid
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    errors.push({ msg: 'Please enter a valid email address' });
  }

  // check if passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  // check password length
  if (password.length < 8) {
    errors.push({ msg: "Password should be at least 8 characters long" });
  }

  // check for errors
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    // validation passed
    User.findOne({ email: email }).then((user) => {
      console.log("Found user:", user);
      if (user) {
        // user already exists, display error message
      
        errors.push({ msg: "Email already exists" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {

        // generate hashed and salted password with bcrypt

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            const hashedPassword = hash;

            // errors.push({msg: "you are registered"});
        
            const newUser = new User({
              name,
              email,
              password // <--- attribute is using hashed password
            });
        
            newUser
              .save()
              .then(user => {
                
                // success   
                errors.push({msg: "you are registered"});
                console.log(newUser
                  );
        
                setTimeout(() => {
                  res.redirect('/users/login');
                }, 1000);
              })
              .catch(err => console.log(err));
          });
        });
        
      }
    });
  }
});

module.exports = router;
