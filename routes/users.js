const express = require("express");
const { reset } = require("nodemon");
const router = express.Router();

// LOGING PAGE

router.get("/login", (req, res) => res.render("login"));

// REGISTER PAGE

router.get("/register", (req, res) => res.render("register"));

// register handle 

router.post('/register',(req,res) => {
const {name, email, password, password2} = req.body; // <-- maybe as const for each field

// validation

let errors = [];

// check required fileds

if(!name || !email || !password){
errors.push({msg: "please fill in all fields"})};


// password match
if(password!== password2){
    errors.push({msg: "passwords don't match"})};
    

// password length

if(password.length < 8){
    errors.push({msg: "password should be at least 8 characters"});
    };



// check for errors 

if(errors.length > 0){
res.render('register', {
    
errors,
name,
email,
password,
password2

});

} else {
reset.send('success');

}


});


module.exports = router;
