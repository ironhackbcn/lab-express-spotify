const express = require('express');
const router = express.Router();
const spotifyApi = require('../public/token');

spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  });

router.get('/:id', async (req, res, next) => {
  const album = req.params.id;
  try {
    const response = await spotifyApi.getAlbumTracks(album);
    const songs = response.body.items;
    res.render('track', { songs });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
