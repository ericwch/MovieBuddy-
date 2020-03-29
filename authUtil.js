module.exports = {

checkAuthenticated :function (req, res, next){
    if(req.isAuthenticated()){
        
        next()
    }

    else{
        console.log(1234)
        console.log(req.isAuthenticated())
        console.log("not authorized")
        res.redirect("/auth/login")
    }
},

checkUnauthenticated : function(req, res, next){
    if(!req.isAuthenticated()){
        next()
        
    }
    else{
        
        
        console.log("plz log out")
        
        res.status(401).send()

    }
}
}