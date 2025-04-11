const express = require('express')
const path = require('path')
require('dotenv').config()
const connectDB = require('./database/database')
const session = require('express-session');

const publicRoute = require('./router/public.route')
const submitRoute = require('./router/submit.route')
const adminRoute = require('./router/admin.route')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
connectDB()

app.use('/', publicRoute)
app.use('/api', submitRoute)
app.use(session({
    secret: 'yourSecretHere',
    resave: false,
    saveUninitialized: true
}));
app.use('/', adminRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})