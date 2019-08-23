const express = require("express");
const router = express.Router();
const spotifyApi = require("../bin/credentials");

router.get("/:artistId", (req, res, next) => {
  const { artistId } = req.params;
  spotifyApi
    .getArtistAlbums(artistId)
    .then((data) => {
      console.log("The received data from the body ", data.body);
      res.render("albums", data);
    })
    .catch(next);
});

router.get("/tracks/:albumId", (req, res, next) => {
    const { albumId } = req.params;
    spotifyApi.getAlbumTracks(albumId)
        .then((data) => {
            console.log("The received data from the body ", data.body);
            res.render("tracks", data);
        })
        .catch(next);
})

module.exports = router;
