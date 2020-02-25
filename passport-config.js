const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const initialize = function(passport, getUserByUserName, getUserbyId){
    const authenticateUser = async( username, password, done) => {
        
        let user;
        try{
            user = await getUserByUserName(username)
            console.log(user)
            console.log(password)
            console.log(typeof(user))
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            }
            else{
                return done(null, false, {message: "incorrect password"})
            }
        }
        catch(e){
            if (user == null){
                return done(e, false, {message: "incorrect user"})
            }
            return done(e)

        }   
    }
    
    
    passport.use(new localStrategy(authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {return done(null, await getUserbyId(id))})

}

module.exports = initialize