/* eslint-disable quotes */
const express = require("express");

const router = express.Router();

/* Get Home page */
router.get("/", (req, res, next) => {
  res.render("index", { title: "My first Website" });
});

module.exports = router;
