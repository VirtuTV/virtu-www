// import express from 'express'
const express = require('express')

const router = express.Router()

router.get('/faq', (req, res) => {
  res.render('faq', { csrfToken: req.csrfToken() })
})

module.exports = router