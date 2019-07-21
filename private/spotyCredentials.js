'use strict';
// API connection
const SpotifyWebApi = require('spotify-web-api-node');
const credentials = require('./credentials');
/*
const clientId = '58206d77dca14d329b64d6d74b1d5a7d';
const clientSecret = '968837a0664f4747b145e2bcd8e69d74';
*/

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
