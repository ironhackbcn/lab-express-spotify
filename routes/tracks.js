'use stric';

const express = require('express');
const router = express.Router();

// API connection
const SpotifyWebApi = require('spotify-web-api-node');

const clientId = '58206d77dca14d329b64d6d74b1d5a7d';
const clientSecret = '968837a0664f4747b145e2bcd8e69d74';

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  });

router.get('/:albumId', async (req, res, next) => {
  try {
    const albumId = req.params.albumId;
    const tracks = await spotifyApi.getAlbumTracks(albumId);
    console.log(tracks.body.items[0]);
    res.render('tracks', tracks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
