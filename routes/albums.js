'use strict';

const express = require('express');
const router = express.Router();
const spotify = require('../spotifyCredentials');

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const albumsObject = await spotify.getArtistAlbums(id);
    res.render('albums', { albums: albumsObject.body.items });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
