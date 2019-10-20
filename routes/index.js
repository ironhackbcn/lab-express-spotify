const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const clientId = '128efd6ec7f14caa8c995125873783c2';
const clientSecret = '8d7482cf6f764c939b737ce3f19ad580';

// require spotify-web-api-node package here:

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
  })

 router.get('/', (req, res, next) =>{
  res.render('index');
});

router.get('/artists', (req, res, next) => {
  const {artist} = req.query;
  spotifyApi.searchArtists(artist)
    .then(data => {
      res.render('artists', { artists: data.body.artists.items} )
      console.log("The received data from the API: ", data.body.artists.items);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    })


});

 module.exports = router;