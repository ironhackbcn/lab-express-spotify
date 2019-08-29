const express = require('express');

const router = express.Router();

const spotifyApi = require('../helpers/spotifyCredentials');

router.get('/:artistId', (req, res, next) => {
  const { artistId } = req.params;
  console.log(`${artistId}`);
  spotifyApi
    .getArtistAlbums(artistId)
    .then((data) => {
      console.log(`You are looking for: ${artistId}`);
      // console.log(`The data from the API: ${data.body.artists.items.length}`);
      // console.log("The received data from the API: ", data.body.items[0]);
      res.render('albums', data);
    })
    .catch((error) => {
      console.log(`Error trying to search artists data: ${error}`);
    });
});

module.exports = router;
