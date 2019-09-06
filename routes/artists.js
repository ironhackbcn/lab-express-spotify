/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
const express = require("express");

const router = express.Router();

// require spotify-web-api-node package here:
const spotifyApi = require("../api/spotifyapi");

/* Get Artist page */
router.get("/", (req, res, next) => {
  const artistsReq = req.query.artist;
  console.log("Estoy en la ruta de artists y la query es", req.query.artist);
  spotifyApi
    .searchArtists(artistsReq)
    .then(data => {
      console.log("The received data from the API: ", data.body.artists.items);
      res.render("artists", data.body);
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    });
});

module.exports = router;
