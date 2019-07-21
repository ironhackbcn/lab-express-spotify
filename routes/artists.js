'use strict';

const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('../spotifyAPI');

router.get('/', async (req, res, next) => {
  const searchInput = req.query.artist;
  try {
    const data = await SpotifyWebApi.searchArtists(searchInput);
    console.log(data);
    const artists = data.body.artists.items;
    console.log(artists);
    res.render('artists', { artists });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
