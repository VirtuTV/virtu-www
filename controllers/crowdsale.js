import express from 'express'
import flash from 'express-flash'
import Sendgrid from '../helpers/sendgrid.js'

const router = express.Router()

router.get('/crowdsale', (req, res) => {
  res.render('crowdsale')
})

router.post('/subscribe', (req, res) => {
  req.flash('info', 'Thank you for subscribing. Check your email inbox.')
  Sendgrid(req.body.subscribe_email)
  res.render('crowdsale', {
    info: req.flash('info')
  })
})

module.exports = router