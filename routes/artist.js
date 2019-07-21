const express = require('express');
const router = express.Router();

 const spotifyApi = require('../helpers/spotify');

 router.get('/', async (req, res, next) => {
  const { artist } = req.query;

  try {
   const artistObj = await spotifyApi.searchArtists(artist);
   res.render('artist', { artist: artistObj.body.artists.items });
   
 } catch (error) {
   next(error);
 }
});

module.exports = router;