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

// Route to get albums from spotify API
router.get('/:artistId', async (req, res, next) => {
  try {
    const id = req.params.artistId; // name after req.params.NAME - has to be the same as in the path above!
    const albums = await spotifyApi.getArtistAlbums(id);
    // console.log(albums.body.items);
    res.render('albums.hbs', albums);
  } catch (error) {
    next(error);
  }
});

// router.get('/:artistId/tracks', async(req, res, next) => {
//   try {
//     const id = req.params.artistId;
//     const = tracks await getAlbumTracks(id)
//   } catch (error) {
//     next(error);
//   }
// })

// Get tracks in an album
spotifyApi.getAlbumTracks('41MnTivkwTO3UUJ8DrqEJJ', { limit: 5, offset: 1 })
  .then(function (data) {
    console.log(data.body);
  }, function (err) {
    console.log('Something went wrong!', err);
  });

module.exports = router;
