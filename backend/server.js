require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const songRoutes = require('./routes/songs')
const userRoutes = require('./routes/user')

//express app
const app = express()

/*const cors = require('cors')
 
app.use(cors()) */


//middleware
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://flockrank.net");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/songs', songRoutes)

app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT || 4000, () => {
            console.log('connected to db & listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })




