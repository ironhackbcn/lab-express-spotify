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
    const match = !!data.body.artists.total;
    res.render('artists', { artists, match, searchInput });
    console.log('\x1b[33m', `[OK] ${data.body.artists.total} artists found`);
  } catch (error) {
    next(error);
  }
});

router.get('/:artistId/albums', async (req, res, next) => {
  const artistId = req.params.artistId;
  const artistData = await SpotifyWebApi.getArtist(artistId);
  const artistName = artistData.body.name;
  console.log('\x1b[34m', `[APP] User selected artist: ${artistId}`);
  try {
    const data = await SpotifyWebApi.getArtistAlbums(artistId);
    const artistAlbums = data.body.items;
    res.render('albums', { artistAlbums, artistName });
    console.log('\x1b[33m', '[OK] Albums loaded');
  } catch (error) {
    next(error);
  }
});

router.get('/:artistId/albums/:albumId', async (req, res, next) => {
  const albumId = req.params.albumId;
  const artistId = req.params.artistId;
  console.log(`[APP] User selected album: ${albumId}`);
  try {
    const albumData = await SpotifyWebApi.getAlbum(albumId);
    const albumCover = albumData.body.images[0].url;
    const albumArtist = albumData.body.artists[0].name;
    const albumTitle = albumData.body.name;
    const data = await SpotifyWebApi.getAlbumTracks(albumId);
    const albumTracks = data.body.items;
    res.render('tracks', { albumTracks, albumCover, albumArtist, albumTitle, artistId });
    console.log('\x1b[33m', '[OK] Album tracks loaded');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
