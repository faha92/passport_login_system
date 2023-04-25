const express = require("express");
const router = express.Router();
const { ensureAutenticated } = require("../config/auth");

// welcome
router.get("/", (req, res) => res.render("welcome"));

// dashboard
router.get("/dashboard", ensureAutenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user,
  })
);

module.exports = router;
