'use strict';

const express = require('express');
const router = express.Router();

const spotifyApi = require('../spotifyCred');

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await spotifyApi.getArtistAlbums(id);
    const albums = data.body.items;
    const artist = await spotifyApi.getArtist(id);
    const artistAlbums = { artist: artist.body.name, albums };
    console.log(artistAlbums);
    res.render('albums', { artistAlbums });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
