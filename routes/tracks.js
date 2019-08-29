const express = require('express');

const router = express.Router();

const spotifyApi = require('../helpers/spotifyCredentials');

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  console.log(`${id}`);
  spotifyApi
    .getAlbumTracks(id)
    .then((data) => {
      // console.log(`You are looking for: ${artistId}`);
      console.log(`The data from the API: ${data.body.items}`);
      //     // console.log("The received data from the API: ", data.body.items[0]);
      res.render('tracks', data);
    })
    .catch((error) => {
      console.log(`Error trying to search artists data: ${error}`);
    });
});

module.exports = router;
