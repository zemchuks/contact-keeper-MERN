const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

/**
 *  @route      POST api/users
 *  @descr      Register a user
 *  @access     Public
 */
router.post('/', [
        //validation
        check('name', 'Please add a name').not().isEmpty(),
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
            // If the user doesn't exist, create a new User with the user model
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

            // Generate a json web token
            const payload = {
                user: {
                    id: user.id,
                    name: user.name
                }
            }

            //Generate a token and sign
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000
            }, (err, token) => {
                if(err) throw err
                res.json({ token })
            })

        } catch (err) {
            console.error(err.message);
            //send a server error
            res.status(500).send('server error')
    } 
})

module.exports = router