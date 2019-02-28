const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const clientId = 'ae92749d048e4cd9a882022b26d9b2ae';
const clientSecret = '9ea905b6ff3b4a8eba41be132f2b733b';

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  });

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const { artist } = req.query;
  try {
    const artists = await spotifyApi.searchArtists(artist);
    res.render('artists', { artists: artists.body.artists.items });
  } catch (error) {
    next(error);
  }
});

// .getArtistAlbums() code goes here
router.get('/albums/:artistId', async (req, res, next) => {
  const { id } = req.params;
  try {
    const artistArray = await spotifyApi.getArtistAlbums(id);
    if (artistArray.statusCode >= 400 && artistArray.statusCode <= 500) {
      next();
      return;
    }
    res.render('albums', { artist: artistArray[0] });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
