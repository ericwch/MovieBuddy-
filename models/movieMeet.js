const mongoose = require('mongoose')

const movieMeetSchema = new mongoose.Schema(
    
    
    
    
    {
    
    movieTitle: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    cinema: {
        type: String,
        required: true
    },

    participants_id: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
        required: true,
        
    },

    participants_name: {
        type: [String],
        required: true
    }
    
})

const MovieMeet = mongoose.model('movieMeet',movieMeetSchema)

MovieMeet.prototype.isUserIn = function(user){
    
    return this.participants_id.includes( user._id )
}
module.exports = MovieMeet
