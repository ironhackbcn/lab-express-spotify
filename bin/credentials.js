const SpotifyWebApi = require("spotify-web-api-node");

const clientId = "ec36ad03d1e34d3ea23c7cf0af637de6";
const clientSecret = "034538237b694161a65744d0533869fc";

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
