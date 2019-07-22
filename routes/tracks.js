'use strict';

const express = require('express');
const router = express.Router();

const spotifyApi = require('../spotifyCred');

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await spotifyApi.getAlbum(id);
    const title = data.body.name;
    console.log(title);
    const albumTracks = data.body.tracks.items;
    console.log(albumTracks);
    const tracks = { title, albumTracks };
    res.render('tracks', { tracks });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
