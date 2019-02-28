const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

// Remember to insert your credentials here----------------------
const clientId = '2b206eb022fa4e3cab91cc85b270fc6f';
const clientSecret = '403cb0f884164b7692efda09a1952ea1';

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

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// data.body.artists.items
router.get('/artists', async (req, res, next) => {
  const { search } = req.query;
  try {
    const data = await spotifyApi.searchArtists(search);
    // console.log(data.body.artists.items[0].images[0].url);
    res.render('artists', { artists: data.body.artists.items }); // { data: data }
  } catch (error) {
    console.log('The error while searching artists occurred: ', error);
  }
});

router.get('/albums/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const albums = await spotifyApi.getArtistAlbums(id);
    console.log(albums.body.items);
    res.render('albums', { albums: albums.body.items });
  } catch (error) {
    console.log('The error while searching artists occurred: ', error);
  }
});

router.get('/tracks/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    console.log(id);
    const tracks = await spotifyApi.getAlbumTracks(id);
    console.log(tracks.body.items);
    res.render('tracks', { tracks: tracks.body.items });
  } catch (error) {
    console.log('The error while searching artists occurred: ', error);
  }
});

module.exports = router;
