const express = require('express');
const router = express.Router();

const spotifyApi = require('../helpers/spotify');

router.get('/', async function (req, res, next) {
  const { artist } = req.query;

  try {
    const artistArray = await spotifyApi.searchArtists(artist);
    // console.log(artistArray);
    // console.log(artistArray.body.artists.items[0]);
    res.render('artist', { artist: artistArray.body.artists.items });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
