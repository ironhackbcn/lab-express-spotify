const SpotifyWebApi = require('spotify-web-api-node');

// Remember to insert your credentials here
const clientId = 'fed8cc90df634455a7c3607e0df63492';
const clientSecret = '67891505eda04165a28035e25f1c78a9';

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
