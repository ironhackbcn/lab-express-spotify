'use stric';

const express = require('express');
const router = express.Router();
const spotifyApi = require('../private/spotyCredentials');

router.get('/:artistId', async (req, res, next) => {
  try {
    const artistId = req.params.artistId;
    const albums = await spotifyApi.getArtistAlbums(artistId);
    // console.log(albums.body.items[0]);
    res.render('albums', albums);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
