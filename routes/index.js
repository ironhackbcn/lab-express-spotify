const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

// require spotify-web-api-node package here:
const clientId = '3aca70a4c0e4491b9f042f7e17403fdf',
    clientSecret = '1213601d06924311a6897f69038ccf44';

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then( data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  })

 router.get('/', (req, res, next) =>{
  res.render('index', {title: 'Express'});
});

router.get('/artists', (req, res, next)=>{
  spotifyApi.searchArtists(req.query.artist)
    .then(data => {
      let {items} = data.body.artists;
      res.render('artists', {items})
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    })
})

router.get('/albums/:artistId', (req, res, next) => {
  spotifyApi.getArtistAlbums(req.params.artistId)
    .then(function(data) {
      let artistAlbums = data.body.items
      res.render('albums', {artistAlbums})
    }, function(err) {
      console.error(err);
    });
});

router.get('/tracks/:albumId', (req, res, next) => {
  spotifyApi.getAlbumTracks(req.params.albumId)
  .then(function(data) {

    let {items} =data.body
    console.log(items)
    res.render('tracks', {items})
  }, function(err) {
    console.log('Something went wrong!', err);
  });
})

 module.exports = router;