'use strict';

const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('../spotifyAPI');

router.get('/', async (req, res, next) => {
  const searchInput = req.query.artist;
  console.log(`User searched for: ${searchInput}`);
  try {
    const data = await SpotifyWebApi.searchArtists(searchInput);
    // console.log(data);
    const artists = data.body.artists.items;
    res.render('artists', { artists });
    console.log('\x1b[32m', '[OK] Artists loaded');
  } catch (error) {
    next(error);
  }
});

router.get('/:artistId/albums', async (req, res, next) => {
  const artistId = req.params.artistId;
  console.log(`User selected artist: ${artistId}`);
  try {
    const data = await SpotifyWebApi.getArtistAlbums(artistId);
    // console.log(data);
    const artistAlbums = data.body.items;
    res.render('albums', { artistAlbums });
    console.log('\x1b[32m', '[OK] Albums loaded');
  } catch (error) {
    next(error);
  }
});

router.get('/:artistId/albums/:albumId', async (req, res, next) => {
  const albumId = req.params.albumId;
  console.log(`User selected album: ${albumId}`);
  try {
    const data = await SpotifyWebApi.getAlbumTracks(albumId);
    // console.log(data);
    const albumTracks = data.body.items;
    res.render('tracks', { albumTracks });
    console.log('\x1b[32m', '[OK] Album tracks loaded');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
