const express = require('express');

const router = express.Router();

const spotifyApi = require('../helpers/spotifyCredentials');

router.get('/', (req, res, next) => {
  const { artistquery } = req.query;
  console.log(`${artistquery}`);
  spotifyApi
    .searchArtists(artistquery)
    .then((data) => {
      console.log(`You are looking for: ${artistquery}`);
      console.log(`The data from the API: ${data.body.artists.items.length}`);
      console.log("The received data from the API: ", data.body);
      res.render('artists', data.body);
    })
    .catch((error) => {
      console.log(`Error trying to search artists data: ${error}`);
    });
});

module.exports = router;
