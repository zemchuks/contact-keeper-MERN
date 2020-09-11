const express = require('express')
const router = express.Router()

/**
 *  @route      GET api/contacts
 *  @descr      Get all users contacts
 *  @access     Private
 */
router.get('/', (req, res) => {
    res.send('Get all contacts')
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