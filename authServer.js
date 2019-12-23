if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const flash = require('express-flash')
const session = require("express-session")
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session);
const passport = require("passport")
const initialize = require("./passport-config")
const bcrypt = require('bcrypt')
const User = require("./models/user")
initialize(
        passport, 
        user => User.find({username: user}),
        id => User.findById(id)
)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(flash())
app.use(express.urlencoded( {extended: true}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: new MongoStore({mongooseConnection: db}),
    saveUninitialized: false
}))


app.use(passport.initialize());
app.use(passport.session());



app.get("/login", (req, res) =>{
    res.render("auth/login")
})

app.post("/login", passport.authenticate('local', {
    successRedirect: "/moviemeet",
    failureRedirect: "/login",
    failureFlash: true
}))

app.get("/register", (req,res) => {
    res.render("auth/register")
})


app.post("/register", async (req, res) => {
    
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,12)
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        })
        await newUser.save()
        console.log("registeration success!!")
        res.redirect("/login")

    } catch (error) {
        console.log(error)
        res.redirect("/register")
        
    }
})

app.listen(process.env.PORT || 4000)