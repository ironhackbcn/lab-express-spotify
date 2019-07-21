'use stric';

const express = require('express');
const router = express.Router();
const spotifyApi = require('../private/spotyCredentials');

router.get('/:albumId', async (req, res, next) => {
  try {
    const albumId = req.params.albumId;
    const tracks = await spotifyApi.getAlbumTracks(albumId);
    console.log(tracks.body.items[0]);
    res.render('tracks', tracks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
