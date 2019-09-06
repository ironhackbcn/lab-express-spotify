/* eslint-disable object-shorthand */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */

// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");

// Remember to insert your credentials here
const clientId = "bad3396694064bc49402fb708aa3bbde";
const clientSecret = "11f02d0fc5cc46f69e4f8b913de32e39";

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => {
    console.log("Connected to the API");
    // eslint-disable-next-line dot-notation
    spotifyApi.setAccessToken(data.body["access_token"]);
  })
  .catch(error => {
    console.log("Something went wrong when retrieving an access token", error);
  });

module.exports = spotifyApi;
