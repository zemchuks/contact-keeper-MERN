const express = require('express')
const connectDB = require('./config/db')

const app = express()

//Connect Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.json({ msg: "welcome to the contact keeper API" }))

//Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

const PORT = process.env.PORT || 5000
try {
    app.listen(PORT, () => console.log(`Live at 🏗  Port 🎚 ${PORT}...😊 `))
} catch (error) {
    console.log(`🏗 Port ${PORT} is down...😠 `);
}

