'use strict';

const express = require('express');
const router = express.Router();

// Retrieve an access token
const spotifyApi = require('../helpers/spotifyAuth');

// view tracks
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const tracks = await spotifyApi.getAlbumTracks(id);
    res.render('tracks', { tracks: tracks.body.items });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
