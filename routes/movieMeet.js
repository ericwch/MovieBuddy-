const express = require('express')
const router = express.Router()
const MovieMeet = require('../models/movieMeet')

router.get("/", async (req, res) => {
    try {
        movieMeets = await MovieMeet.find()
        console.log(movieMeets)
        res.render('movieMeet/movieMeet', {movieMeets: movieMeets, test: 111111} )
    }
    catch{
        res.redirect('/')
    }
    
})

router.get("/new", (req, res) => {
    res.render("movieMeet/new", { movieDate: new MovieMeet()})
})


router.post("/new", async (req, res) => {
    
    const movieMeet = new MovieMeet({

        movieTitle: req.body.movieTitle,
        date: req.body.date,
        cinema: req.body.cinema,
        participants: [req.body.participant]

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

router.put("/:id", async(req, res) => {
    let movieMeet
    try{
        await MovieMeet.updateOne(
            {_id: req.params.id},
            {$push: {participants: req.body.newParticipant}}
        )
        res.redirect('/moviemeet/')
    }
    catch{
        res.redirect('/')
    }
    
})
router.delete("/:id", async(req, res) => {
    let movieMeet
    console.log(req.params.id)
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
        res.status(401)
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

