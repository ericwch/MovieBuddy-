
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require("../models/user")

module.exports = function(passport){
    
    router.get("/login", (req, res) =>{
        console.log(req.user)
        res.status(204).send()
    })
    
    router.post("/login", passport.authenticate('local'), (req,res)=>{
        console.log(req.user)
        console.log("redirected")
        res.redirect("/")
    })
    
    router.get("/logout", (req,res) =>{
        req.session.destroy()
        res.redirect("/")
        console.log("logged out!")
    })
    
    
    router.get("/register", checkUnauthenticated, (req,res) => {
        res.render("auth/register")
    })
    
    
    router.post("/register", checkUnauthenticated, async (req, res, next) => {
        
        try {
            
            if (await User.findOne({username: req.body.username})) {
    
                console.log("account already existed")
                res.status(201).send({
                    message: "account already existed",
                    user:null
                })
    
                return
                
            }
    
            const hashedPassword = await bcrypt.hash(req.body.password,12)
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword
            })
            await newUser.save()
            console.log("registeration success!!")
            res.redirect("/")
    
        } catch (error) {
            console.log(error)
            res.status(404).send()
        }
    })
    
    
    
    function checkAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            next()
        }
        else{
            console.log(req.isAuthenticated())
            console.log("not authorized")
            res.status(401).send()
        }
    }
    
    function checkUnauthenticated(req, res, next){
        if(!req.isAuthenticated()){
            
            res.send
        }
        else{
            
            
            console.log("plz log out")
            
            res.status(401).send()
    
        }
    }
    

    return router
}

