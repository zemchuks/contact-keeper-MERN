const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const app = express()

//Connect Database
connectDB()

// Init Middleware
app.use(express.json({
    extended: false
}))

//Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

app.use(express.static('./client/build'))
// Serve static assests in production
if (process.env.NODE_ENV === 'production') {


    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}
//set static folder


const PORT = process.env.PORT || 5000


    app.listen(PORT, () => console.log(`Live at 🏗  Port 🎚 ${PORT}...😊 `))

