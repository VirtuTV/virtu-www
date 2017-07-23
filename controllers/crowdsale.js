const express = require('express')
const flash = require('express-flash')
const Sendgrid = require('../helpers/sendgrid.js')
const bodyParser = require('body-parser')

const csurf = require('csurf') // Protection against XSS attacks
const csrfProtection = csurf({ cookie: true })
const parseForm = bodyParser.urlencoded({ extended: false })

const router = express.Router()

router.get('/crowdsale', (req, res) => {
  res.render('crowdsale', { csrfToken: req.csrfToken() })
})

router.get('/contribution', csrfProtection, (req, res) => {
  res.render('contribution', { 
    layout: 'contribute',
    csrfToken: req.csrfToken() 
  })
})

router.post('/user-agreed', parseForm, csrfProtection, (req, res) => {
  console.log(req.body)
  const userAgrees = {};
  res.render('contribution', { 
    layout: 'contribute',
    userAgreed: userAgrees
  })
})


module.exports = router