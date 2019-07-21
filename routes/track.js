const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

const clientId = '428e6b0ff4bf4e2bb658f3dd3a844476';
const clientSecret = '61c7d5de42bd4ef3a1517955cbdea26b';
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

router.get('/:id', (req, res, next) => {
  const album = req.params.id;
  spotifyApi.getAlbumTracks(album)
    .then(function (data) {
      const songs = data.body.items;
      console.log('Albums songs', { songs });
      res.render('track', { songs });
    }, function (err) {
      next(err);
    });
});

module.exports = router;
