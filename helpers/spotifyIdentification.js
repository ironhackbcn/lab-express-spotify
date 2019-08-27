const SpotifyWebApi = require("spotify-web-api-node");
const clientId = "feffec54123841e9aee0993a9c1704bf";
const clientSecret = "f356cc6196b745acb6c2af1d84b9226e";

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

spotifyApi
  .clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body["access_token"]);
  })
  .catch(error => {
    console.log("Something went wrong when retrieving an access token", error);
  });

module.exports = spotifyApi;
