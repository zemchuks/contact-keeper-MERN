const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

/**
 *  @route      GET api/auth
 *  @descr      Get logged in user
 *  @access     Private
 */
router.get('/', (req, res) => {
    res.send('Get logged in user')
})

/**
 *  @route      POST api/auth
 *  @descr      Auth user and get token
 *  @access     Public
 */
router.post('/', [
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Password is required').exists(),
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } 
   
     // destructure req.body to get name, email, and password
     const { email, password } = req.body

     try {
         //check to see if user exists
         let user = await User.findOne({email})
         // if theres not a user, send back invalid credentials
         if(!user) {
             return res.status(400).json({ msg: 'Invalid credentials'})
         }
         //If there's a user, continue to check password
         const isMatch = await bcrypt.compare(password, user.password)

         if(!isMatch) {
             return res.status(400).json({ msg: 'Invalid Credentials'})
         }
         
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