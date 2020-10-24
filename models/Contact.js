const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    //Create a rlshshp btw a user and a contact
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String
    },
    facebook: {
        type: String,
        required: true
    },
    twitter: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'personal'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('contact', ContactSchema)