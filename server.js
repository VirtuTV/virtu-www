// import "babel-polyfill";
require('babel-polyfill')
// import express from 'express'
const express = require('express')
// import session from 'express-session'
const session = require('express-session')
// import path from 'path'
const path = require('path')
// import morgan from 'morgan'
const morgan = require('morgan')
// import sendgrid from 'sendgrid'
const sendgrid = require('sendgrid')
// import bodyParser from 'body-parser'
const bodyParser = require('body-parser')
// import cookieParser from 'cookie-parser'
const cookieParser = require('cookie-parser')
const csurf = require('csurf')
// import flash from 'express-flash'
const flash = require('express-flash')
const serveStatic = require('serve-static')
// import homeController from './controllers/home' 
const homeController = require('./controllers/home')
// import teamController from './controllers/team'
const teamController = require('./controllers/team')
// import faqController from './controllers/faq'
const faqController = require('./controllers/faq')
// import crowdsaleController from './controllers/crowdsale'
const crowdsaleController = require('./controllers/crowdsale')

const app = express()
const PORT = process.env.PORT || 3000;

const Web3 = require('web3')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cookieParser())

app.use(csurf({cookie: true}))

// error handler 
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
 
  // handle CSRF token errors here 
  res.status(403)
  res.send('form tampered with')
})

app.set('trust proxy', 1)
const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: true, 
    expires: expiryDate,
    httpOnly: true
  }
  
}))

app.use(flash())

// Express handlebars 
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

// Static assets in /public
// express.static is express 3. Use serveStatic for express 4. 
app.use(serveStatic(path.join(__dirname, 'public')))

// Security Middleware
const helmet = require('helmet')
app.use(helmet())


// Controllers 
app.use('/', homeController)
app.use('/', teamController)
app.use( '/', faqController)
app.use( '/', crowdsaleController)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})