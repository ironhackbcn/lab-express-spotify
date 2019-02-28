const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

const clientId = 'df6db46653964c4a84d193061e3e67be';
const clientSecret = '350c475252274d628dd7208b6824b329';

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

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    // res.render('tracks');
    const trackArray = await spotifyApi.getAlbumTracks(id);
    console.log(trackArray);
    if (trackArray.statusCode >= 400 && trackArray.statusCode < 500) {
      next();
      return;
    }
    res.render('tracks', { tracks: trackArray.body.items });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
