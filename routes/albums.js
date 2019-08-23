/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const spotifyApi = require('../spotifypass/spotifypass');


router.get('/:id', (req, res, next) => {
  console.log(`EL ALBUM ES ${req.params.id}`);
  const { id } = req.params;
  spotifyApi.getArtistAlbums(id)
    .then((data)=>{
      console.log(data.body.items);
      const { items } = data.body;
      res.render('albums', { items });
    })
    .catch((error) => {
      console.log('The error while searching artists occurred: ', error);
    });
});
module.exports = router;
