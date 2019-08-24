/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const spotifyApi = require('../spotifypass/spotifypass');

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  spotifyApi.getAlbumTracks(id)
    .then((data) => {
      const { items } = data.body;
      res.render('tracks', { items });
    })
    .catch((error) => {
      console.log(`The error while searching artists occurred: ${error}`);
    });
});


module.exports = router;
