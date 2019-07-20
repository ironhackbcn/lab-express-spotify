'use strict';

const express = require('express');
const router = express.Router();


const SpotifyWebApi = require('spotify-web-api-node');
const clientId = '5db9edca966a4673b5d8ce982ee4df1f';
const clientSecret = 'f8fa62946c5d4f94b9ba9a91810e5eac';

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then( data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  })

router.get('/', async (req, res, next) => {
    try {const title = req.query.title;
    const artists = await spotifyApi.searchArtists({title})
    res.render('artists', artists)
    }
    catch (err) {
      console.log("The error while searching artists occurred: ", err);
    }
});

 module.exports = router;