export const  checkAuthenticated = function (req, res, next){
    if(req.isAuthenticated()){
        next()
    }
    else{
        console.log(req.isAuthenticated())
        console.log("not authorized")
        res.status(401).send()
    }
}

export const checkUnauthenticated = function(req, res, next){
    if(!req.isAuthenticated()){
        
        res.send
    }
    else{
        
        
        console.log("plz log out")
        
        res.status(401).send()

    }
}