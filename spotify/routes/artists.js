const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const router = express.Router();

// setting the spotify-api goes here:
const clientId = '58d7562620754b3db964fe679006deb9';
const clientSecret = '054705687cb7471d8910063db87811c9';

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  });

/* GET users listing. */
router.get('/', (req, res, next) => {
  const { artist } = req.query;
  spotifyApi.searchArtists(artist)
    .then(data => {
      console.log(data.body.albums);
      res.render('artists', { artists: data.body.artists.items });  
    })
    .catch(err => {
      console.log('The error while searching artists occurred: ', err);
    });
});



module.exports = router;
