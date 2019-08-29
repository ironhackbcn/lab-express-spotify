// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');

// Remember to insert your credentials here
const clientId = 'e698ef05dc63476cb8d7799fa8e03738';
const clientSecret = '710c57bc9acf4452bbb1d6d2a754a50b';

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then((data) => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch((error) => {
    console.log('Something went wrong when retrieving an access token', error);
  });

module.exports = spotifyApi;
