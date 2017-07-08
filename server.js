import express from 'express'
import session from 'express-session'
import path from 'path'
import morgan from 'morgan'
import sendgrid from 'sendgrid'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import flash from 'express-flash'
import homeController from './controllers/home' 
import teamController from './controllers/team'
import faqController from './controllers/faq'
import crowdsaleController from './controllers/crowdsale'

import Web3 from 'web3'

const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(flash())

// Express handlebars 
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))

app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))
app.set('build', path.resolve(__dirname, 'build'))
// Static assets in /public
app.use(express.static('public'))

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