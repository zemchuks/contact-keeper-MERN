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
router.post('/', [ auth, [
    check('name', 'Name is required').not().isEmpty()
]], async (req, res) => {
    // Check for errors
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } 

        // destructure req.body to get data from the body
        const { name, email, phone, type } = req.body

        try {
            // create a new contact
            const newContact = new Contact({ name, email, phone, type, user: req.user.id })
            //save to database
            const contact = await newContact.save()
            return res.json(contact)

        } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
        }

    })

/**
 *  @route      PUT api/contacts/:id
 *  @descr      Update contact
 *  @access     Private
 */
router.put('/:id', auth, (req, res) => {
    res.send('Update contact')
})

/**
 *  @route      Delete api/contacts/:id
 *  @descr      Delete contact
 *  @access     Private
 */
router.delete('/:id', auth, (req, res) => {
    res.send('Delete contact')
})

module.exports = router