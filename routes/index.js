const express = require('express');
const spotifyApi = require('../spotifyApi');
const router = express.Router();

router.get('/', (req, res, next) =>{
  res.render('index', {title: 'Spotify Lab'});
});

router.get('/artists', (req, res) => {
  console.log(req.query.artist)
  spotifyApi.searchArtists(req.query.artist)
    .then(data => {
      let {items} = data.body.artists;
      console.log(items)
      res.render('artists', {items});
    })
    .catch(error => {
      console.log(`An error ocurred: ${error}`);
    })
});

 module.exports = router;