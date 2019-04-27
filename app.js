const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// setting the spotify-api goes here:
const clientId = 'a745883dad764aa78792b9306eaddefd',
    clientSecret = '5934fadd9a25444f8f2575c82393a288';

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


// the routes go here:
app.get('/',(req,res,next)=>{
  res.render('index');
})


app.get('/artists',(req,res)=>{

  spotifyApi.searchArtists(req.query.artistName)
  .then(data => {
    const artistData = {data}; 
    // console.log("The received data from the API: ", data.body.artists.items[0]);
    res.render('artists',{data});
  })
  .catch(err => {
    console.log("The error while searching artists occurred: ", err);
  })
})

app.get('/artists/:id/albums',(req,res)=>{

  const {id} = req.params;
  console.log(id);
  
  spotifyApi.getArtistAlbums(id) // passing id in params
  .then(data => {
    console.log("The received data from the API: ", data.body);
    const albums = {data}; 
    res.render('albums',{albums:data.body});
  })
  .catch(err => {
    console.log("The error while searching artists occurred: ", err);
  })
})


app.get('/albums/:id/tracks',(req,res)=>{

  const {id} = req.params;
  console.log(id);
  
  spotifyApi.getAlbumTracks(id) // passing id in params
  .then(data => {
    console.log("The received data from the API: ", data.body);
    const tracks = {data}; 
    res.render('tracks',{tracks:data.body});
  })
  .catch(err => {
    console.log("The error while searching artists occurred: ", err);
  })
})

app.get('/artists',(req,res)=>{
  res.render('artists');
})


app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
