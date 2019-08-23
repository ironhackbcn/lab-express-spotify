/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

// Remember to insert your credentials here
const clientId = 'efe0d3afa92b41ed86c489f0f3d8db60';
const clientSecret = 'bcba6f256e7f4c0da738a2037aa191cf';

const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
});
  // Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then((data) => {
    spotifyApi.setAccessToken(data.body.access_token);
  })
  .catch((error) => {
    console.log('Something went wrong when retrieving an access token', error);
  });

router.get('/artists', (req, res, next) => {
    console.log ('hola pepe como estas')
//     console.log(req.query);
//   const { artist } = req.query;
//   console.log(typeof artist);
//   spotifyApi.searchArtists(artist)
//     .then((data) => {
//       console.log('The received data from the API: ', data.body);
//       // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
//       res.redirect('artists');
//     })
//     .catch((err) => {
//       console.log('The error while searching artists occurred: ', err);
//     });
});


module.exports = router;
