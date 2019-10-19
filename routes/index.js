const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');

// require spotify-web-api-node package here:

const clientId = 'c1c10f63331a4410b44ae23300fb54fc',
    clientSecret = '72f5d3533d35483791dea69050442091';

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

router.get('/', (req, res, next) =>{
  res.render('index', {title: 'Express'});
});

router.get("/artists", (req, res, next)=>{
  spotifyApi.searchArtists(req.query.artist)
  .then(data => {
    let {items} = data.body.artists
    res.render("artists", {items})
  })
  .catch(err => console.log("Error finding the artist: " + err))
})

router.get("/albums/:artistId", (req, res, next)=>{
  let {artistId} = req.params
  spotifyApi.getArtistAlbums(artistId)
    .then(data =>{
      let {items} = data.body
      res.render("albums", {items})
    })
    .catch(err => console.log("Error finding the album: " + err))
})

router.get("/songs/:albumId", (req, res, next)=>{
  let {albumId} = req.params
  console.log(albumId)
  spotifyApi.getAlbumTracks(albumId)
    .then(data =>{
      let {items} = data.body
      console.log(items)
      res.render("songs", {items})
    })
    .catch(err=> console.log("Error finding the songs: " + err))
})

 module.exports = router;