'use strict';

const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');
const clientId = 'ea338f7fdc3845edbe4444ce7ece8947';
const clientSecret = '8aaf65a42be641dab99f2e6055b476e4';

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});
spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  });

router.get('/', async (req, res, next) => {
  try {
    const searchfamous = req.query.search;
    const artist = await spotifyApi.searchArtists(searchfamous);
    console.log(artist.body);
    res.render('artists', artist);
  } catch (error) {
    next(error);
  }
});
router.get('/albums/:artistId', async (req, res, next) => {
  try {
    const id = req.paramas.artistId;
    const albums = await spotifyApi.getArtistAlbums(id, (err, data) => {
      if (err) console.error(err);
      else console.log('Artist albums', data);
    });
    console.log(albums);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
