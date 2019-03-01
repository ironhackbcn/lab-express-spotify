const express = require('express')
const router = express.Router()
const SpotifyWebApi = require('spotify-web-api-node')

const clientId = 'ae92749d048e4cd9a882022b26d9b2ae'
const clientSecret = '9ea905b6ff3b4a8eba41be132f2b733b'

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
})

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token'])
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error)
  })

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const { artist } = req.query
  try {
    const artists = await spotifyApi.searchArtists(artist)
    res.render('artists', { artists: artists.body.artists.items })
  } catch (error) {
    next(error)
  }
})

module.exports = router
