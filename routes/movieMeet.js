const express = require('express')
const router = express.Router()
const MovieMeet = require('../models/movieMeet')

const mysqlPool = require("../mysql")

router.get("/", async (req, res) => {
    try {
        
        const movieMeets = await MovieMeet.find()
        
        res.send(movieMeets)
        
    }
    catch(err){
        console.log(err)
        res.status(404).send()
        
    }
    
})

router.get("/movieinfo", async (req, res) => {
    try{
        const movies = new Object
        var t0 = new Date()

  

        
        const movieinfo = await mysqlPool.query(
            "select m.movie_id as id, m.title as title,\
            JSON_ARRAYAGG(json_object('cinema_id', c.cinema_id, 'cinema_name', c.cinema_name, 'showtime', s.showtime)) as cinema\
            from\
            (select movie_id, cinema_id, JSON_ARRAYAGG(showtime) as showtime\
            from showtime\
            group by movie_id , cinema_id) s\
            left join cinema c\
            on c.cinema_id = s.cinema_id\
            left join movie m \
            on m.movie_id = s.movie_id\
            group by id"
        )
        


        
        
        
        console.log(movieinfo)
    
        movieinfo.forEach( movie => {
            
            movies[movie.id] = {title: movie.title, cinemas : JSON.parse(movie.cinema)}
            console.log(movies[movie.id].cinemas)
        }

        )
        var t1 = new Date()
        console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
        console.log(movies)
        res.send(movies)
    }
    catch(err){
        console.log(err)
        res.status(404).send()
    }
})

router.get("/movieid", async (req, res) => {

    try{
        
        const movies = await mysqlPool.query("select movie.title, movie.movie_id as id from movie ")
        
        

        /*const today = new Date();
        const date = today.getFullYear()+'-'
                    + String((today.getMonth()+1)).padStart(2, "0") +'-'
                    + String(today.getDate()).padStart(2, "0");*/
        
                    
        res.send(movies)
    }
    catch(err){

        console.log(err)
        res.status(404).send()

    }
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
        res.status(204).send()
    }
    catch(err){
        console.log(err)
        
        res.status(404).send()
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
        res.status(204).send()
        console.log('removed!')
    }
    catch{
        if (movieMeet == null){
            res.status(404).send({errorMessage: "movieMeet deoesnt exist"})
        }
        else {
            res.status(404).send({errorMessage: "delete fail"})
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

