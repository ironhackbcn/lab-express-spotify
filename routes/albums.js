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

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  spotifyApi.getArtistAlbums(id).then(
    (data) => {
      console.log('Artist albums', data.body);
      res.render('albums', { albums: data.body.items });
    },
    (err) => {
      console.error(err);
    }
  );
});

module.exports = router;
