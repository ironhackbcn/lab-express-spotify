'use stric';

const express = require('express');
const router = express.Router();

// API connection
const SpotifyWebApi = require('spotify-web-api-node');

const clientId = '58206d77dca14d329b64d6d74b1d5a7d';
const clientSecret = '968837a0664f4747b145e2bcd8e69d74';

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

router.get('/:artistId', async (req, res, next) => {
  console.log('eeeeeiiii');
  try {
    const artistId = req.params.artistId;
    const albums = await spotifyApi.getArtistAlbums(artistId);
    // console.log(albums.body.items[0]);
    res.render('albums', albums);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
