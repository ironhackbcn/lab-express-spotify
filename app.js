/*he cambiado node por nodemon en fila 6 en el package.json*/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');
//la info de clientID y ClientSecret la encuentro en la API de spotify:
const clientId = 'a5d141012f0642faa1d05fde30ebdab3';
const clientSecret = 'f9bfea0f90a14243b9ad39490e2d348a';

//iteración 1
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
  })

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
//le digo que las views de la aplicación van a estar en este path (carpeta views)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

//va a estar en la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

/*
app.get('/artists'), (req, res, next) => {
  let artist =
    spotifyApi.getArtists();
   .then(artist => )
}
*/
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

app.listen(3000, () => { 
  console.log('app listening on port 3000!');
})