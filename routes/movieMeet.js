const express = require('express')
const router = express.Router()
const MovieMeet = require('../models/movieMeet')
const flash = require("express-flash")
const fetch = require("node-fetch")

router.get("/", async (req, res) => {
    try {
        movieMeets = await MovieMeet.find()
        
        res.render('movieMeet/movieMeet', {movieMeets: movieMeets, test: 111111} )
    }
    catch(err){
        console.log(err)
        res.redirect('/')
    }
    
})

router.get("/new", checkAuthenticated,(req, res) => {
    res.render("movieMeet/new", { movieDate: new MovieMeet()})
})


router.post("/new", async (req, res) => {
    
    const movieMeet = new MovieMeet({

        movieTitle: req.body.movieTitle,
        date: req.body.date,
        cinema: req.body.cinema,
        participants_id: [req.user._id],
        participants_name: [req.user.username]

    })
    console.log('make!')
    try {
        const newmovieMeet = await movieMeet.save()
        res.redirect(`/moviemeet/${newmovieMeet.id}`)
    }
    catch {
        res.redirect('/')
    }
})

router.get("/:id", (req, res) => {
   
    res.render('movieMeet/id', {   
        id: req.params.id
    })
    
})

router.put("/:id", checkAuthenticated,async(req, res) => {
    let movieMeet
    try{
        await MovieMeet.updateOne(
            {_id: req.params.id},
            {$push: {
                participants_id: req.user._id,
                participants_name: req.user.username
            }}
        )
        res.redirect('/moviemeet/')
    }
    catch{
        res.redirect('/')
    }
    
})
router.delete("/:id", async(req, res) => {
    let movieMeet
    
    try{
        movieMeet = await MovieMeet.findById(req.params.id)
        await movieMeet.remove()
        res.redirect("/moviemeet/")
        console.log('removed!')
    }
    catch{
        if (movieMeet == null){
            res.redirect('/')
        }
        else {
            res.redirect(`/${movieMeet.id}`)
        }
        

    }
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        next()
    }
    else{
        req.flash("error", "please log in to start or join a movie meet!")
        res.redirect("http://localhost:4000/login")
    }
}

function checkUnauthenticated(req, res, next){
    if(!req.isAuthenticated()){
        next()
    }
    else{
        res.status(401)
    }
}


module.exports = router

