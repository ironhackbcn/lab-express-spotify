const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const hbs = require('hbs')
const app = express()

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))
hbs.registerPartials(path.join(__dirname, '/views/partials'))

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use((req, res, next) => {
  res.status(404)
  res.render('not-found')
})

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err)

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500)
    res.render('error')
  }
})

module.exports = app
