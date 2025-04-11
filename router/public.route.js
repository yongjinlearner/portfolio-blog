const express = require('express')
const path = require('path')
require('dotenv').config()
const router = express.Router()

router.get('/', (req, res)=>{
    res.sendFile('../public/index.html')
})

module.exports = router