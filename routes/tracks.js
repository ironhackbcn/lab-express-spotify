/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
const express = require("express");

const router = express.Router();

// require spotify-web-api-node package here:
const spotifyApi = require("../api/spotifyapi");

/* Get Tracks page */
router.get("/:albumId", (req, res, next) => {
  const trackReq = req.params.albumId;
  console.log("The ID from the URL is:", trackReq);

  spotifyApi
    .getAlbumTracks(trackReq)
    .then(data => {
      console.log("Albums tracks: ", data.body.items);
      res.render("tracks", data.body.items);
    })
    .catch(err => {
      console.log("The error while getting albums occurred: ", err);
    });
});

module.exports = router;
