// import express from 'express'
const express = require('express')
// import flash from 'express-flash'
const flash = require('express-flash')
// import Sendgrid from '../helpers/sendgrid.js'
const Sendgrid = require('../helpers/sendgrid.js')

const router = express.Router()

router.get('/crowdsale', (req, res) => {
  res.render('crowdsale', { csrfToken: req.csrfToken() })
})

// router.post('/subscribe', (req, res) => {
//   req.flash('info', 'Thank you for subscribing. Check your email inbox.')
//   Sendgrid(req.body.subscribe_email)
//   res.render('crowdsale', {
//     info: req.flash('info')
//   })
// })

router.get('/contribution', (req, res) => {
  res.render('contribution', { 
    layout: 'contribute',
    csrfToken: req.csrfToken() 
  })
})

module.exports = router