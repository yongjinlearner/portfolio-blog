const express = require('express')
const path = require('path')
require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./database/database')

const publicRoute = require('./router/public.route')
const submitRoute = require('./router/submit.route')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
connectDB()

app.use('/', publicRoute)
app.use('/api', submitRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})