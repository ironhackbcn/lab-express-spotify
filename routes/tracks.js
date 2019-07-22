const express = require('express');
const router = express.Router();

 const spotifyApi = require('../helpers/spotify');

 router.get('/:albumId', async (req, res, next) => {
    const { albumId } = req.params;
  try {
   const tracksArray = await spotifyApi.getAlbumTracks(albumId);
   console.log(tracksArray.body.items);
   res.render('tracks', { tracks: tracksArray.body.items });
 } catch (error) {
   next(error);
 }
});

module.exports = router; 