const express = require('express');
const router = express.Router();
const spotifyApi = require('../public/token');

router.get('/', async (req, res, next) => {
  const artist = req.query.name;
  try {
    const response = await spotifyApi.searchArtists(artist);
    const artistsArray = response.body.artists.items;
    res.render('artists', { artistsArray });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  const artist = req.params.id;
  try {
    const response = await spotifyApi.getArtistAlbums(artist);
    const albums = response.body.items;
    res.render('albums', { albums });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
