const SpotifyWebApi = require('spotify-web-api-node');
const clientId = 'ee7ef79318c546b7ac113ce67708e5ca';
const clientSecret = 'b3d3c75d0c4a4b738f9c09b96352f75e';

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
