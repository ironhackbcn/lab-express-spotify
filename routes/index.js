const express = require('express');
const spotifyApi = require('../spotifyApi'); // Require SpotifyApi
const router = express.Router();

// Index view
router.get('/', (req, res, next) =>{
  res.render('index', {title: 'Spotify'});
});

// Artists view
router.get('/artists', (req, res) => {
  let {artist} = req.query;
  spotifyApi.searchArtists(artist)
    .then(data => {
      let {items} = data.body.artists;
      res.render('artists', {
        items,
        title: 'Artists'
      });
    })
    .catch(error => {
      console.log(`An error ocurred: ${error}`);
    })
});

// Albums view
router.get('/albums/:artistId', (req, res) => {
  let {artistId} = req.params;
  spotifyApi.getArtistAlbums(artistId)
    .then(data => {
      let {items} = data.body;
      res.render('albums', {
        items,
        title: 'Albums'
      });
    })
    .catch(error => {
      console.log(`An error occurred: ${error}`);
    })
});

// Tracks View
router.get('/tracks/:albumId', (req, res) => {
  let {albumId} = req.params;
  spotifyApi.getAlbumTracks(albumId)
    .then(data => {
      let {items} = data.body;
      res.render('tracks', {
        items,
        title: 'Tracks'
      });
    })
    .catch(error => {
      console.log(`An error occurred: ${error}`);
    })
});

 module.exports = router;