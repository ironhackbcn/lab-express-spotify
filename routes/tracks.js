/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');

const router = express.Router();
const spotifyApi = require('../spotifypass/spotifypass');

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  console.log(id);
});


module.exports = router;
