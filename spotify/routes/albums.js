const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const router = express.Router();

// setting the spotify-api goes here:
const clientId = '58d7562620754b3db964fe679006deb9';
const clientSecret = '054705687cb7471d8910063db87811c9';

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
