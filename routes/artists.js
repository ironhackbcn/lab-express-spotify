'use strict';

const express = require('express');
const router = express.Router();

const spotifyApi = require('../spotifyCred');

router.get('/search', async (req, res, next) => {
  try {
    const { artist } = req.query;
    const data = await spotifyApi.searchArtists(artist);
    console.log(data.body.artists.items);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
