'use strict';
// API connection
const SpotifyWebApi = require('spotify-web-api-node');
const credentials = require('./credentials');

const clientId = credentials.clientId;
const clientSecret = credentials.clientSecret;

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
