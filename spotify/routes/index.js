var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// app.get('/albums/:artistId', (req, res, next) => {
//   // .getArtistAlbums() code goes here
// });

module.exports = router;
