var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
// const SpotifyWebApi = require('spotify-web-api-node');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var artistsRouter = require('./routes/artists');
var albumsRouter = require('./routes/albums');
var tracksRouter = require('./routes/tracks');

var app = express();

// // Remember to insert your credentials here
// const clientId = '145d94d3cafb41f98fddc5f544e2d396';
// const clientSecret = '963c5241c7934bf08d78436501d1c8ba';

// const spotifyApi = new SpotifyWebApi({
//   clientId: clientId,
//   clientSecret: clientSecret
// });

// // Retrieve an access token
// spotifyApi.clientCredentialsGrant()
//   .then(data => {
//     spotifyApi.setAccessToken(data.body['access_token']);
//   })
//   .catch(error => {
//     console.log('Something went wrong when retrieving an access token', error);
//   });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
