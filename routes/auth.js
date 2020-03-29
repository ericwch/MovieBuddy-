
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require("../models/user")
const Auth = require("../authUtil")
const checkAuthenticated = Auth.checkAuthenticated
const checkUnauthenticated = Auth.checkUnauthenticated
module.exports = function(passport){
    
    router.get("/login", checkUnauthenticated, (req, res) =>{
        console.log("go to login page")
        res.render("auth/login")
    })


    
    
    router.post("/login", passport.authenticate('local'), (req,res)=>{
        console.log("loggined")
        res.redirect("/")
    })
    
    router.get("/logout",checkAuthenticated, (req,res) =>{
        console.log("logouted")
        req.session.destroy()
        res.redirect("/auth/login")
        
    })
    
    
    router.get("/register", checkUnauthenticated, (req,res) => {
        console.log("go to register")
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
    

    return router
}

