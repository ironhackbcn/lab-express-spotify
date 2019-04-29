const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// require spotify-web-api-node package here:

const clientId = 'e12e3514b81548939589ed2868b6dca9', clientSecret = 'a51bcd7127b049388b84b0280b629ef2';

const spotifyApi = new SpotifyWebApi({
clientId: clientId,
clientSecret: clientSecret
});

//Retrieve an access
spotifyApi.clientCredentialsGrant()
  .then (data => {
    spotifyApi.setAccessToken(data.body['access_token']);
    
  })
  .catch(error => {console.log('Something went wrong', error);
});



// setting the spotify-api goes here:

// the routes go here:

app.get('/', (req, res) => {
  res.render('home');
});

//SEARCH FORM

app.get('/artists', (res,req,next) => {

  spotifyApi.searchArtists(req.query.artist)

  .then(function(data) {
    console.log('HEY');
    res.render('artists', {
      artists: data.body.artists.items
    });
  })
  .catch(err => {
    console.log("The error while searching artists occurred: ", err);
  })
});

// GET ARTIST ROUTE

app.get('/albums/:artistId', (req, res, next) => {
  // .getArtistAlbums() code goes here
});

module.exports = app;


app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
