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
        async user => {return ( User.findOne({username: user}))},
        async id => {return (await User.findById(id))}
)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)

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

/* load the user info (if logged in) to res.locals for the views to display the logged in user */
app.use((req, res, next) => {
    res.locals.user = req.user
    
    next()
})

app.get("/login", (req, res) =>{
    res.render("auth/login")
})

app.post("/login", passport.authenticate('local', {
    successRedirect: "http://localhost:3000/moviemeet",
    failureRedirect: "/login",
    failureFlash: true
}))

app.get("/register", checkUnauthenticated, (req,res) => {
    res.render("auth/register")
})


app.post("/register", checkUnauthenticated, async (req, res) => {
    
    try {
        
        if (await User.findOne({username: req.body.username})) {

            req.flash("error", `username ${req.body.username} has been registered`)
            return res.render("auth/register")
            
        }
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

app.get("/logout", (req,res) =>{
    req.session.destroy()
    console.log("logged out!")
    res.redirect("http://localhost:3000/moviemeet")
})
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next()
    }
    else{
        console.log("not authorized")
        res.status(401)
    }
}

function checkUnauthenticated(req, res, next){
    if(!req.isAuthenticated()){
        
        next()
    }
    else{
        
        
        console.log("plz log out")
        res.status(401)
    }
}
app.listen(process.env.PORT || 4000)