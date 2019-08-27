const express = require("express");
const router = express.Router();

// Retrieve an access token
const spotifyApi = require("../helpers/spotifyIdentification");

router.get("/:artistId", (req, res, next) => {
  const { artistId } = req.params;
  spotifyApi
    .getArtistAlbums(artistId)
    .then(data => {
      console.log("The received data from the API ", data.body);
      res.render("albums", data.body);
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    });
});

router.get("/tracks/:albumId", (req, res, next) => {
  const { albumId } = req.params;
  spotifyApi
    .getAlbumTracks(albumId)
    .then(data => {
      console.log("The received data from the API ", data.body);
      res.render("tracks", data.body);
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    });
});
module.exports = router;
