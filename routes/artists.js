'use stric';

const express = require('express');
const router = express.Router();
const spotifyApi = require('../private/spotyCredentials');

router.get('/', async (req, res, next) => {
  try {
    const searchTerm = req.query.search; // en req.query recibimos la info del formulario si su método es GET
    const artists = await spotifyApi.searchArtists(searchTerm);
    res.render('artists', artists);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
