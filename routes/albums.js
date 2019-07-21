const express = require('express');
const router = express.Router();

 const spotifyApi = require('../helpers/spotify');

 router.get('/:artistId', async (req, res, next) => {
    const { artistId } = req.params;
  try {
   const albumsArray = await spotifyApi.getArtistAlbums(artistId);
   console.log(albumsArray.body.items);
   res.render('albums', { albums: albumsArray.body.items });
 } catch (error) {
   next(error);
 }
});

module.exports = router; 