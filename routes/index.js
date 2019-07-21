'use strict';

const express = require('express');
const spotifyApi = require('../spotifyAPI');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'SpotiSearch' });
});

module.exports = router;
