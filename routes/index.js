'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const home = {
    title: '...here!',
    label: 'Look for an artist',
    button: 'Search'
  };
  res.render('index', home);
});

module.exports = router;
