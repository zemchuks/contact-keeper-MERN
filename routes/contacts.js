const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Contact = require('../models/Contact')

/**
 *  @route      GET api/contacts
 *  @descr      Get all users contacts
 *  @access     Private
 */
router.get('/', auth, async (req, res) => {
    try { 
        const contact = await Contact.find({ user: req.user.id }).sort({ date: -1 })
        res.json(contact)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server not found')
    }
})

/**
 *  @route      POST api/contacts
 *  @descr      Add new contact
 *  @access     Private
 */
router.post('/', (req, res) => {
    res.send('Add  contact')
})

/**
 *  @route      PUT api/contacts/:id
 *  @descr      Update contact
 *  @access     Private
 */
router.put('/:id', (req, res) => {
    res.send('Update contact')
})

/**
 *  @route      Delete api/contacts/:id
 *  @descr      Delete contact
 *  @access     Private
 */
router.delete('/:id', (req, res) => {
    res.send('Delete contact')
})

module.exports = router