'use strict';

const express = require('express');
const router = express.Router();

 const spotifyApi = require('../helpers/spotify');

 //como pilla la instancia del fichero helper???

 router.get('/', async (req, res, next) => {
   const { artist } = req.query;
  try {
   const artistArray = await spotifyApi.searchArtists(artist);
   res.render('artist', { artist: artistArray.body.artists.items });
 } catch (error) {
   next(error);
 }
});

module.exports = router; 