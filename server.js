if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express = require('express')
const app = express()

const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const movieMeetRouter = require('./routes/movieMeet')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')


app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.use(expressLayouts)
app.use(express.static('public'))




const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))




app.use('/', indexRouter)
app.use('/movieMeet', movieMeetRouter)


app.listen(process.env.PORT || 3000)



