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

// .getArtistAlbums() code goes here
router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const albums = await spotifyApi.getArtistAlbums(id)
    /* if (artists.statusCode >= 400 && artists.statusCode <= 500) {
      next()
      return
    } */
    res.render('albums', { albums: albums.body.items })
  } catch (error) {
    next(error)
  }
})

module.exports = router
