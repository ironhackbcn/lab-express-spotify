const express = require('express');
const router = express.Router();

const spotifyApi = require('../helpers/spotify');

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const albumObj = await spotifyApi.getArtistAlbums(id);
    res.render('albums', { albums: albumObj.body.items });
  } catch (error) {
    next(error);
  }
});

 module.exports = router;
