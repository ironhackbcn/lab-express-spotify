'use strict';

const express = require('express');
const router = express.Router();

// Retrieve an access token
const spotifyApi = require('../helpers/spotifyAuth');

// search artist
router.get('/', async (req, res, next) => {
  const { artist } = req.query;
  try {
    const artists = await spotifyApi.searchArtists(artist);
    console.log(artist);
    console.log(artists);
    res.render('artists', { artist: artists.body.artists.items });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
