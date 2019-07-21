'use strict';

const SpotifyWebApi = require('spotify-web-api-node');
const APIKeys = require('./APIKeys.json');

const clientId = APIKeys.clientId;
const clientSecret = APIKeys.clientSecret;

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(data => {
    const token = data.body.access_token;
    spotifyApi.setAccessToken(token);
    console.log(token);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  });

module.exports = spotifyApi;
