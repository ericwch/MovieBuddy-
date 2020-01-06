if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const express = require('express')
const app = express()

const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const flash = require('express-flash')

const passport = require('passport')
const session = require('express-session')
const initialize = require("./passport-config")

const indexRouter = require('./routes/index')
const movieMeetRouter = require('./routes/movieMeet')

const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')

const User = require("./models/user")

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))





app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: new MongoStore({mongooseConnection: db}),
    saveUninitialized: false
}))

app.use(flash())

passport.deserializeUser(async (id, done) => {return done(null, await User.findById(id))})
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.use(expressLayouts)
app.use(express.static(__dirname + '/public'));


app.use('/', indexRouter)
app.use('/movieMeet', movieMeetRouter)


app.listen(process.env.PORT || 3000)



