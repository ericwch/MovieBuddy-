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

    participants: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
        required: true,
        
    }


})

module.exports = mongoose.model('movieMeet',movieMeetSchema)
