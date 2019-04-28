const express = require('express');
const hbs = require('hbs');
// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

// setting the spotify-api goes here:

// Remember to insert your credentials here

const clientId = '76816fd56b0e45249c9e80bb93a91131',
    clientSecret = '7901de4af5b04cb1a4be9240656992ae';

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

app.get('/', (req,res) => {
  res.render('index')
})

app.get('/artists', (req,res) => {
  spotifyApi.searchArtists(req.query.artist)
  .then(data => {
    res.render('artists', {
      artists: data.body.artists.items
    });
  })
  .catch(err => {
    console.log("The error while searching artists occurred: ", err);
  })
})

app.get('/albums/:artistId', (req, res, next) => {
  spotifyApi.getArtistAlbums(req.params.artistId)
  .then(data => {
    res.render('albums', {
      albums: data.body.items
    });
    //console.log("The received data from the API: ", data.body.items[0]);
  })
  .catch(err => {
    console.log('Something went wrong!', err);
  });
});



app.get('/tracks/:albumId', (req, res, next) => {
  spotifyApi.getAlbumTracks(req.params.albumId)
  .then(data => {
    res.render('tracks', {
      tracks: data.body.items
    });
    //console.log("The received data from the API: ", data.body.items[0]);
  })
  .catch(err => {
    console.log('Something went wrong!', err);
  });
});

app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
