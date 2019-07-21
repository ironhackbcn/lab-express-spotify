'use strict';

const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('../spotifyAPI');

router.get('/', async (req, res, next) => {
  const searchInput = req.query.artist;
  console.log('\x1b[34m', `[APP] User searched for: ${searchInput}`);
  try {
    const data = await SpotifyWebApi.searchArtists(searchInput);
    const artists = data.body.artists.items;
    const total = !!data.body.artists.total;
    console.log(total);
    res.render('artists', { artists, total });
    console.log('\x1b[33m', `[OK] ${data.body.artists.total} artists found`);
  } catch (error) {
    next(error);
  }
});

router.get('/:artistId/albums', async (req, res, next) => {
  const artistId = req.params.artistId;
  console.log('\x1b[34m', `[APP] User selected artist: ${artistId}`);
  try {
    const data = await SpotifyWebApi.getArtistAlbums(artistId);
    // console.log(data);
    const artistAlbums = data.body.items;
    res.render('albums', { artistAlbums });
    console.log('\x1b[33m', '[OK] Albums loaded');
  } catch (error) {
    next(error);
  }
});

router.get('/:artistId/albums/:albumId', async (req, res, next) => {
  const albumId = req.params.albumId;
  console.log(`[APP] User selected album: ${albumId}`);
  try {
    const data = await SpotifyWebApi.getAlbumTracks(albumId);
    // console.log(data);
    const albumTracks = data.body.items;
    res.render('tracks', { albumTracks });
    console.log('\x1b[33m', '[OK] Album tracks loaded');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
