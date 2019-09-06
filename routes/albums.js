/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
const express = require("express");

const router = express.Router();

// require spotify-web-api-node package here:
const spotifyApi = require("../api/spotifyapi");

/* Get Albums page */
router.get("/:artistId", (req, res, next) => {
  const albumsReq = req.params.artistId;
  console.log("The ID from the URL is:", albumsReq);

  spotifyApi
    .getArtistAlbums(albumsReq)
    .then(data => {
      console.log("Artist albums: ", data.body.items);
      res.render("albums", data.body.items);
    })
    .catch(err => {
      console.log("The error while getting albums occurred: ", err);
    });
});

module.exports = router;
