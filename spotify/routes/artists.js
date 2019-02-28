const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');
const clientId = 'dcfde3a8c1754a699b6019b5c1369856';
const clientSecret = '16a9458939d6460da854002e38f73808';

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

router.get('/', async (req, res, next) => {
  const { artist } = req.query;

  try {
    const artistResult = await spotifyApi.searchArtists(artist);
    res.render('artists', { artists: artistResult.body.artists.items });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/albums', async (req, res, next) => {
  const { id } = req.params;

  try {
    const artistResult = await spotifyApi.searchArtists(id);
    res.render('artists', { artists: artistResult.body.artists.items.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
