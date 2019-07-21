'use stric';

const express = require('express');
const router = express.Router();

const spotifyApi = require('./credentials');

/* GET tracks listing. */
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await spotifyApi.getAlbumTracks(id);
    const tracks = data.body.items;
    res.render('tracksList', { tracks });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
