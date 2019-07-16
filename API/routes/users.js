const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const database = require("../database/mysql");

/*GET users listing*/
router.get("/", (req, res, next) => {
  res.send("Respond with a resource");
  next();
});

router.get("/register", (req, res, next) => {
  res.render("register", { title: "Register" });
  next();
});

router.get("/login", (req, res, next) => {
  res.render("login", { title: "Login" });
  next();
});
