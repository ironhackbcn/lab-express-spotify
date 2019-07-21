'use strict';

const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

// Remember to insert your credentials here
const clientId = '8af14f9b9fa04fc085f25b3ce7b17c35';
const clientSecret = '91a57b7c38ba432fb8545964f6fbb486';

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

router.get('/:albumId', async (req, res, next) => {
  try {
    const id = req.params.albumId;
    const tracks = await spotifyApi.getAlbumTracks(id);
    // console.log('This is working');
    // console.log(tracks.body.items);
    res.render('tracks.hbs', tracks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
