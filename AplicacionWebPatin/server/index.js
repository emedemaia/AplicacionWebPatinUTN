const express = require('express')
const adminRoutes = require('./Routes/adminRoutes')
const turnosRoutes = require('./Routes/turnosRoutes')
const app = express()
require('dotenv').config()
require('./config/database')
const userRoutes = require('./Routes/userRoutes')
const cors = require('cors')
const path = require('path');

//Middlewares
app.use(express.json()),
app.use(cors())

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//Routes
app.use('/api/users', userRoutes),
app.use('/api/turnos', turnosRoutes),
app.use('/api/admin', adminRoutes)

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

//Para Heroku
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})