'use strict';

const express = require('express');
const spotifyApi = require('../spotifyAPI');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'SpotiSearch' });
  console.log('\x1b[32m', '[OK] Home page rendered');
});

module.exports = router;
