'use strict';

const express = require('express');
const router = express.Router();

const spotifyApi = require('../spotifyCred');

router.get('/search', async (req, res, next) => {
  try {
    const { artist } = req.query;
    const data = await spotifyApi.searchArtists(artist);
    const artists = data.body.artists.items;
    res.render('artists', { artists });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
