const express = require("express");
const router = express.Router();
const spotifyApi = require("../bin/credentials");

router.get("/", (req, res, next) => {
  const search = req.query.artistquery;
  spotifyApi
    .searchArtists(search)
    .then(data => {
      console.log("The received data from the body ", data.body);
      res.render("artists", data);
    })
    .catch(next);
});

module.exports = router;
