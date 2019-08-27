const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  const home = {
    label: "Search for an Artist",
    button: "Search"
  };
  res.render("index", home);
});

module.exports = router;
