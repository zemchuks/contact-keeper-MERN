const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    //Create a rlshshp btw a user and a contact
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String
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