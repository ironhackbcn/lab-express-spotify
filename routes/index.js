const express = require('express');
const spotifyApi = require('../spotifyApi'); // Require SpotifyApi
const router = express.Router();

// Load Index view
router.get('/', (req, res, next) =>{
  res.render('index', {title: 'Spotify Lab'});
});

// Load Artists view
router.get('/artists', (req, res) => {
  let {artist} = req.query;
  spotifyApi.searchArtists(artist)
    .then(data => {
      let {items} = data.body.artists;
      res.render('artists', {items});
    })
    .catch(error => {
      console.log(`An error ocurred: ${error}`);
    })
});

// Load Albums view
router.get('/albums/:id', (req, res, next) => {
  let {id} = req.params;
  spotifyApi.getArtistAlbums(id)
    .then(data => {
      let {items} = data.body;
      console.log(items);
      res.render('albums', {items});
    })
    .catch(error => {
      console.log(`An error ocurred: ${error}`);
    })
})

 module.exports = router;