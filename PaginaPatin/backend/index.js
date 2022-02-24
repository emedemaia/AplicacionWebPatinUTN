const express = require('express')
const adminRoutes = require('./Routes/adminRoutes')
const turnosRoutes = require('./Routes/turnosRoutes')
const app = express()
require('dotenv').config()
require('./config/database')
const userRoutes = require('./Routes/userRoutes')
const cors = require('cors')

//Middlewares
app.use(express.json()),
app.use(cors())

//Routes
app.use('/api/users', userRoutes),
app.use('/api/turnos', turnosRoutes),
app.use('/api/admin', adminRoutes)



app.listen(process.env.port, () => {
    console.log(`Servidor corriendo en puerto ${process.env.port}`)
})