'use strict';

const express = require('express');
const router = express.Router();

// Retrieve an access token
const spotifyApi = require('../helpers/spotifyAuth');

// search an album
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const artistAlbums = await spotifyApi.getArtistAlbums(id);
    console.log(id);
    console.log(artistAlbums);
    res.render('albums', { albums: artistAlbums.body.items });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
