var express = require('express');
var router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const clientId = '145d94d3cafb41f98fddc5f544e2d396';
const clientSecret = '963c5241c7934bf08d78436501d1c8ba';

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

/* GET users listing. */

router.get('/', (req, res, next) => {
  const artista = req.query.name;

  spotifyApi.searchArtists(artista)
    .then(data => {
      console.log(data.body.artists.items[0].images[0].url);
      res.render('artists', { artists: data.body.artists.items });
    })
    .catch(err => {
      console.log('The error while searching artists occurred: ', err);
    });
});

module.exports = router;
