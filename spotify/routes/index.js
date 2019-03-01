const express = require('express')
const router = express.Router()
// const SpotifyWebApi = require('spotify-web-api-node');

// GET home page.
router.get('/', (req, res, next) => {
  res.render('index')
})

router.post('/', (req, res, next) => {
  console.log(req.body)
  res.redirect('/')
})

module.exports = router
