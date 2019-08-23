/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const spotifyApi = require('../spotifypass/spotifypass');


router.get('/', (req, res, next) => {
  const { artist } = req.query;
  spotifyApi.searchArtists(artist)
    .then((data) => {
      console.log('The received data from the API: ', data.body.artists.items.length);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
      if (data.body.artists.items.length === 0) {
        res.render('/');
      } else {
        const { items } = data.body.artists;
        res.render('artists', { items });
      }
    })
    .catch((err) => {
      console.log('The error while searching artists occurred: ', err);
    });
});


module.exports = router;
