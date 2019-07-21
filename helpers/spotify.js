const SpotifyWebApi = require('spotify-web-api-node');

const clientId = '80808e6419b245ffa0ce96795de4d86a';
const clientSecret = '9c751dc6d2c647edb99366252caaa869';

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