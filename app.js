const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

const SpotifyWebApi = require('spotify-web-api-node');

// Remember to insert your credentials here
const clientId = 'fed8cc90df634455a7c3607e0df63492',
    clientSecret = '67891505eda04165a28035e25f1c78a9';

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

const indexRouter = require('./routes/index');

 const app = express();

 // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

 app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

 app.use('/', indexRouter);

 // catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

 // error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

   // render the error page
  res.status(err.status || 500);
  res.render('error');
});

 module.exports = app;