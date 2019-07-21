'use strict';
const SpotifyWebApi = require('spotify-web-api-node');

const clientId = '900d6288a31b4ac7975909fd1ada13eb';
const clientSecret = 'da237513761745f18842d0ae7040ddbc';

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

module.exports = spotifyApi;
