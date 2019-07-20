const express = require('express')
const router = express.Router()
const SpotifyWebApi = require('spotify-web-api-node')
const clientId = '630e9472645f4136b995ec4d47812c70'
const clientSecret = 'ff315e4079064ef39751815b0fb28b60'

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
})

const myMusic = require('./Albums')

spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token'])
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error)
  })

router.get('/', (req, res, next) => {
  res.render('index', myMusic)
  console.log(myMusic)
})

router.get('/serch', (req, res, next) => {
  spotifyApi.searchArtists(req.query.artist)
    .then(data => {
      data.body.artists.items.forEach(data => console.log('The received data from the API: ', data.images))
      console.log('The received data from the API: ', data.body.artists)
      res.render('artists', data.body.artists)
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    })
    .catch(err => {
      console.log('The error while searching artists occurred: ', err)
    })
    // res.render('index', { title: 'Grizzly' })
})

router.get('/albums/:id', (req, res, next) => {
  spotifyApi.getArtistAlbums(req.params.id)
    .then(function (data) {
      console.log('Artist albums', data.body.items)
      // data.body.items.images[0].url
      res.render('albums', data.body)
    }, function (err) {
      console.error(err)
    })
  // res.render('index', { title: 'Grizzly' })
})

router.get('/songs/:id', (req, res, next) => {
  spotifyApi.getAlbumTracks(req.params.id)
    .then(function (tracksInfo) {
      console.log(tracksInfo.body.items)
      res.render('songs', tracksInfo.body)
    })
    .catch(function (error) {
      console.error(error)
    })
})

module.exports = router
