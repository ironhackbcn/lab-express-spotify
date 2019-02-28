const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const clientId = '182c03633e0e45b482a4a3fef39deaaf';
const clientSecret = '5db1b97cf7ba4c6ba6ad260ae49abd0a';
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

// ROUTES START HERE

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/artists', (req, res, next) => {
  const { artist } = req.query;

  spotifyApi.searchArtists(artist)
    .then(data => {
      console.log(data.body.artists.items[0]);
      const artists = data.body.artists;
      res.render('artists', { artists });
    })
    .catch(err => {
      console.log('The error while searching artists occurred: ', err);
    });
});

router.get('/albums/:id', (req, res, next) => {
  res.render('albums');
});

module.exports = router;
