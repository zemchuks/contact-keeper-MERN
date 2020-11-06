const jwt = require('jsonwebtoken')
const config = require('config')

// Protecting routes with Auth middleware
module.exports = (req, res, next) => {
    //Get the token from the header
    const token = req.header('x-auth-token')

    // Check if token doesn't exist
    if(!token) {
        return res.status(401).json({ msg: 'No token, Authorisation denied' })
    }
    // If there is a user with a token, then verify it
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}