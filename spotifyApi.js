const SpotifyWebApi = require('spotify-web-api-node');
const clientId = '272ee2be75504c7ea7e76fb1e582a6c8';
const clientSecret = '6d2878a851f3439b8042d0169c4dfa4e';

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
  })

  module.exports = spotifyApi;