import express from 'express'

const router = express.Router()

router.get('/faq', (req, res) => {
  res.render('faq')
})

module.exports = router