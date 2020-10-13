//============================//
//      Dependencies          //
//============================//
require('dotenv').config
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')

//============================//
//   Database & connections   //
//============================//
// const MONGODB_URI = process.env.MONGODB_URI
// const db = mongoose.connection
//
// mongoose.connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//
// //checks error&&success
// db.on('error', (err) => console.log(err.message + 'Is mongodb not running?'))
// db.on('connected', ()=> console.log('Your mongod has connected'))
// db.on('disconnected', ()=> console.log('Your mongod has disconnected'))
//
// //opens connection to mongod
// db.on('open', ()=>{})

//============================//
//     Routes assigned        //
//============================//
const users = require('./routes/users')

//============================//
//        MiddleWare          //
//============================//
//Turns off a deprication error with findByIdAndUpdate
mongoose.set('useFindAndModify', false)
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}))
//I don't think I need this since the above line is extended to true instead of false.
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(logger('dev'))

//============================//
//         Routes             //
//============================//
app.use('/users', users)

//test route for initial setup
// app.get('/', (req, res, next) => {
//     res.status(200).json({
//         serverRoutesJs: "You requsted the index page"
//     })
// })
//============================//
//         404 errors         //
//============================//
//errors when route cannot be be found
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
//============================//
//      error handler         //
//============================//
//error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'developement' ? err : {}
    const status = err.status || 500
    //respond to client
    res.status(status).json({
        error: {
            serverjs: error.message
        }
    })
    //respond to ourselves
    console.error(err)
})

//============================//
//             PORT           //
//============================//
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
