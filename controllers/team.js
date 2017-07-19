// import express from 'express'
const express = require('express')


const router = express.Router()

router.get('/team', (req, res) => {
  res.render('team', { csrfToken: req.csrfToken() })
})

module.exports = router