const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');


// require spotify-web-api-node package here:
// Remember to insert your credentials here
const clientId = '0f545bc1de3c43a2acea2dda27294a3b',
    clientSecret = '494117a623af48f182307f60ac6f2090';

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token



const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// setting the spotify-api goes here:


spotifyApi.clientCredentialsGrant()
  .then( data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  })


// the routes go here:

app.get('/', (req, res) => {
  res.render('artists');
});

app.get(`/artists`, (req,res,) => {
  console.log(req.query)
  spotifyApi.searchArtists(req.query.text)
  .then(data => {
    console.log(data.body.artists.items[0]);
    console.log(data.body.artists.items[0].id);
    //console.log("The received data from the API: ", data.body);
    res.render(`artistsFile`, data.body.artists)
   
   
  })
  .catch(err => {
    console.log("The error while searching artists occurred: ", err);
  })
});

 
app.get(`/artistsFile/:id/albums`, (req, res) => {
  console.log(req.params);
  spotifyApi.getArtistAlbums(req.params.id)
  .then(data => {
    console.log(data.body.items[0]);
    res.render(`albums`, data.body);
  })
  .catch(err => {
    console.error(err);
  });
});

app.get(`/albums/:tracks`, (req, res) => {
  console.log(req.params);
  spotifyApi.getAlbumTracks(req.params.tracks, { limit : 5, offset : 1 })
  .then(data => {
    console.log(data.body.items);
    res.render(`tracks`, data.body);
  })
  .catch(err => {
    console.error(err);
  });
});


app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
