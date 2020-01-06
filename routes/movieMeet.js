const express = require('express')
const router = express.Router()
const MovieMeet = require('../models/movieMeet')
const cheerio = require('cheerio')
const rp = require('request-promise')

const mysqlPool = require("../mysql")

router.get("/", async (req, res) => {
    try {
        
        const movieMeets = await MovieMeet.find()
        
        res.render('movieMeet/movieMeet', {movieMeets: movieMeets} )
    }
    catch(err){
        console.log(err)
        
    }
    
})

router.get("/new", checkAuthenticated, async (req, res) => {

    const movies = await mysqlPool.query("select movie.title, movie.movie_id as id from movie")

    const today = new Date();
    const date = today.getFullYear()+'-'
                + String((today.getMonth()+1)).padStart(2, "0") +'-'
                + String(today.getDate()).padStart(2, "0");

    res.render("movieMeet/new", { movieMeet: new MovieMeet(), date: date, movies: movies})
})


router.post("/new", async (req, res) => {
    
    var movieMeet = new MovieMeet({

        movieTitle: req.body.movieTitle,
        movieId: req.body.movieId,
        showtime: req.body.showtime,
        cinema: req.body.cinema,
        participants_id: [req.user._id],
        participants_name: [req.user.username],
        cinemaLat: req.body.cinemaLat,
        cinemaLng: req.body.cinemaLng

    })
    console.log(movieMeet)
    try {
        console.log('make!')
        const newmovieMeet = await movieMeet.save()
        res.redirect(`/moviemeet/${newmovieMeet.id}`)
    }
    catch(err){
        console.log(err)
        const movies = await mysqlPool.query("select movie.title, movie.movie_id as id from movie")

        res.render("movieMeet/new", { movieMeet: movieMeet, date: req.body.date, 
            errorMessage: "one or more field is empty", movies: movies})
    }
})


router.get("/movie/:movie_id/:date", async (req, res) => {

    try {
        var result = await mysqlPool.query(
        "select showtime.showtime as showtime, cinema.cinema_name as cinema, \
        cinema.latitude, cinema.longitude from showtime natural join cinema \
        where showtime.movie_id = ?", [req.params.movie_id]
        )
        console.log("===========")
        console.log(result)

        const showtimeObj = new Object()

        result.forEach(element => {
            if(showtimeObj[element.cinema]){
                showtimeObj[element.cinema].showtime.push(element.showtime)
            }
            else{
                showtimeObj[element.cinema] = {
                    showtime: [element.showtime],
                    latitude: element.latitude,
                    longitude: element.longitude
                }
            }
        });
        console.log(showtimeObj)
        res.send(showtimeObj)
        
    }
    catch(err){
        console.log(err)
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

