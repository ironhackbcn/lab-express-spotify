const express = require("express");
const router = express.Router();

// Retrieve an access token
const spotifyApi = require("../helpers/spotifyIdentification");

router.get("/", (req, res, next) => {
  const artist = req.query.artist;
  spotifyApi
    .searchArtists(artist)
    .then(data => {
      console.log("The received data from the body ", data.body.artists.items);
      res.render("artists", data.body.artists);
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    });
});
module.exports = router;
