// import express from 'express'
const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/whitepaper.pdf', (req, res) => {
  const tempFile="../public/whitepaper.pdf";
    fs.readFile(tempFile, function (err,data){
       res.contentType("application/pdf");
       res.send(data);
    });
})

module.exports = router