const express = require('express')
const {getAllTurnos, createTurno, getTurnosByEmail, deleteTurnoById, updateTurnoById} = require('../controllers/turnosControllers')
const turnosRoutes = express.Router()

turnosRoutes.get('/', getAllTurnos)

turnosRoutes.post('/crearTurno/:id', createTurno)

turnosRoutes.get('/turnosUsuario', getTurnosByEmail)

turnosRoutes.delete('/eliminarTurno/:id', deleteTurnoById)

turnosRoutes.put('/modificarTurno/:id', updateTurnoById)

module.exports= turnosRoutes