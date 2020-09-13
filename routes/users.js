const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

/**
 *  @route      POST api/users
 *  @descr      Register a user
 *  @access     Public
 */
router.post('/', [
    //validation
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})

], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } 
    // destructure req.body to get name, email, and password
    const { name, email, password } = req.body

    try {
        // Check to see if there's a user with an existing email
        let user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({ msg: 'User already exist!' })
        }
        // If the user doesn't exist, user = new User with the user model
        user = new User({
            name, 
            email, 
            password
        })
        //Encrypt the password with bcrypt
        const salt = await bcrypt.genSalt(10)
        // Hash the password
        user.password = await bcrypt.hash(password, salt)
        //save to database
        await user.save()

        res.send('user saved')

    } catch (err) {
        console.error(err.message);
        //send a server error
        res.status(500).send('server error')
    }
})

module.exports = router