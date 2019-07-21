'use stric';

const SpotifyWebApi = require('spotify-web-api-node');
const clientId = '854da551673f443782ee09f22c0b2461';
const clientSecret = 'bc6a688345cc40c6b71a9cb9c7014f8a';
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
