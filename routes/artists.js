'use strict';

const express = require('express');
const router = express.Router();
const spotify = require('../spotifyCredentials');

router.get('/', async (req, res, next) => {
  const { artist } = req.query;
  try {
    const artistObj = await spotify.searchArtists(artist);
    res.render('artists', { artist: artistObj.body.artists.items });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
