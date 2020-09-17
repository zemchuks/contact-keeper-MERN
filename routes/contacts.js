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
        // 500 - Server Error
        res.status(500).send('Server error')
        }

    })

/**
 *  @route      PUT api/contacts/:id
 *  @descr      Update contact
 *  @access     Private
 */
router.put('/:id', auth, async (req, res) => {
    // destructure req.body to get data from the body
    const { name, email, phone, type } = req.body

    //Build contact object
    const contactFields = {}
    // If there's a name, add it to contactFields
    if (name) contactFields.name = name
    if (email) contactFields.email = email
    if (phone) contactFields.phone = phone
    if (type) contactFields.type = type

    try {
        let contact = await Contact.findById(req.params.id)
        // 404 -  Not Found
        if (!contact) return res.status(404).json({ msg: 'Contact not found' })

        // Makes sure user owns contact and turn contact.user into a string
        if (contact.user.toString() !== req.user.id) {
            // Return 401 - Unauthorised
            return res.status(401).json({ msg: 'Not Authorised'})
        }
        
        // Update the user
        contact = await Contact.findByIdAndUpdate(req.params.id, 
            // $set - add update to contactFields
            { $set: contactFields },
            
            // If contact doesn't exist, create it
            { new: true})

            res.json(contact)
            
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }

})

/**
 *  @route      Delete api/contacts/:id
 *  @descr      Delete contact
 *  @access     Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id)
        // 404 -  Not Found
        if (!contact) return res.status(404).json({ msg: 'Contact not found' })

        // Makes sure user owns contact and turn contact.user into a string
        if (contact.user.toString() !== req.user.id) {
            // Return 401 - Unauthorised
            return res.status(401).json({ msg: 'Not Authorised'})
        }
        
        await Contact.findByIdAndRemove(req.params.id)
            
            res.json({ msg: 'Contact removed'})
            
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
})

module.exports = router