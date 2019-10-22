const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const clientId = '1aa9391a314a4382ae48a015fb5c2b5f',
    clientSecret = '34520639861841c582b552e86a1ff420';

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then( data => {
    spotifyApi.setAccessToken(data.body['access_token'])
    console.log(data.body);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  })



 router.get('/', (req, res, next) =>{
  res.render('index', {title: 'Express'});
});

router.get('/artist', (req,res,next)=>{
  let {name} = req.query;
  console.log(name);
  spotifyApi.searchArtists(name)
    .then(data => {
      const {items} = data.body.artists
      console.log("The received data from the API: ", items[0].images[0].url);
      res.render('artist', {items})
      
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    })
})

/* router.get('/albums/:artistId', (req, res, next) => {
  spotifyApi.getArtistAlbums(artistId) 
    .then(data =>{
      console.log('Artist albums', data.body);
            res.render('albums', data.body )
    })
    .catch(err=>{
      console.log("The error while searching artists occurred: ", err)
    })
}); */



router.get('/albums/:artistId', (req, res, next) => {
  spotifyApi.getArtistAlbums(req.params.artistId)
    .then(data => {
      let {items}=data.body.items
      console.log("the received data from the api:", items)
      res.render('albums', {items});
    })
    .catch(err => {
      console.log('thing went wrong!', err);
    });
});


 module.exports = router;