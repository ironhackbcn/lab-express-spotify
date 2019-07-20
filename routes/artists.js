'use strict';

const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

router.get('/', (req, res, next) => {
  console.log('hola');
  res.render('artists');
});

module.exports = router;
