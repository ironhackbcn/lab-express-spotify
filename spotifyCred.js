'use strict';

const SpotifyWebApi = require('spotify-web-api-node');

const clientId = '879f6d40486d4952874c02c35661a2f6';
const clientSecret = 'c5f6e3b5c55b4726877450b6d3325c62';

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

module.exports = spotifyApi;
