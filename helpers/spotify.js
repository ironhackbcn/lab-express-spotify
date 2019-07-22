const SpotifyWebApi = require('spotify-web-api-node');

 const clientId = '5db9edca966a4673b5d8ce982ee4df1f';
const clientSecret = '4c01abef01bd4c29b12a80d5557639f1';

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