const express = require("express");
const router = express.Router();

// LOGING PAGE

router.get("/login", (req, res) => res.send("welcome user login"));

// REGISTER PAGE

router.get("/register", (req, res) => res.send("welcome user register"));

module.exports = router;
