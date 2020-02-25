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

initialize(
    passport, 
    user => {return ( User.findOne({username: user}))},
    id => {return ( User.findById(id))}
)

const indexRouter = require('./routes/index')
const movieMeetRouter = require('./routes/movieMeet')
const authRouter = require("./routes/auth")

const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')

const User = require("./models/user")

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

/*const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}))*/


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

app.use(passport.initialize());
app.use(passport.session());


app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.use(expressLayouts)

app.use("/public", express.static(__dirname + "/public"))



app.get('/', (req, res) => {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()){
        
        app.use(express.static(__dirname + '/webapp/build'));
        res.sendFile(__dirname + '/webapp/build'+ '/index.html')
    }
    else{
        
        app.use(express.static(__dirname + "/authapp/build"))
        res.sendFile(__dirname + '/authapp/build'+ '/index.html')
    }
})


app.use('/movieMeet', movieMeetRouter)
app.use("/auth", authRouter(passport))

app.listen(process.env.PORT || 3000)



