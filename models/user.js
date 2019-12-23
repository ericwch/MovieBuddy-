const mongoose = require('mongoose')

const userSchma = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("user",userSchma)