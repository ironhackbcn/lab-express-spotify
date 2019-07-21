const express = require('express');

const spotifyApi = require('../credentials');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Spotify App' });
});

router.get('/artists', async (req, res, next) => {
  try {
    const artist = req.query.artist;
    const data = await spotifyApi.searchArtists(artist);
    const artists = data.body.artists.items;
    res.render('artists', { artists });
  } catch (error) {
    console.log('An error occurred: ', error);
  }
});

router.get('/albums/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await spotifyApi.getArtistAlbums(id);
    const albums = data.body.items;
    res.render('albums', { albums });
  } catch (error) {
    console.log('An error occurred: ', error);
  }
});

router.get('/tracks/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await spotifyApi.getAlbumTracks(id);
    const tracks = data.body.items;
    console.log('\n\nTracks!!!\n\n');
    console.log(tracks[0]);
    res.render('tracks', { tracks });
  } catch (error) {
    console.log('An error occurred: ', error);
  }
});

module.exports = router;
