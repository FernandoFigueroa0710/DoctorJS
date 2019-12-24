const express = require("express");
const router = express.Router();

/* GET the homepage*/
router.get("/", ensureAuthenticated, (req, res) => {
  res.render("index", { title: "Welcome to DOctorJS" });
});

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("users/login");
};

module.exports = router;
