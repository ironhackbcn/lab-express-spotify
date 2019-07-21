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

router.get('/', (req, res, next) => {
  const artist = req.query.name;
  console.log(artist);
  spotifyApi.searchArtists(artist)
    .then(data => {
      const artistsArray = data.body.artists.items;
      res.render('artists', { artistsArray });
    })
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const artist = req.params.id;
  spotifyApi.getArtistAlbums(artist)
    .then(function (data) {
      const albums = data.body.items;
      res.render('albums', { albums });
    }, function (err) {
      next(err);
    });
});

module.exports = router;
