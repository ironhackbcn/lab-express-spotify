const express = require("express");
const router = express.Router();
const spotifyApi = require("../bin/credentials");

router.get("/", (req, res, next) => {
  res.render("index", { title: "Ironhack Spotify" });
});

module.exports = router;
