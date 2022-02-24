const express = require('express')
const {  createNewUser, updateUser,  loginUserAdmin, getUserById, deleteUser} = require('../controllers/userControllers')
const { userVerifyToken } = require('../validation/validation')

const userRoutes = express.Router()


//Sólo quiero las rutas

userRoutes.get('/userbyid/:id',  getUserById)

userRoutes.post('/registro', createNewUser)

userRoutes.put('/updateUser/:id', updateUser)

userRoutes.post('/login', loginUserAdmin)

userRoutes.delete('/deleteUser/:id',  userVerifyToken, deleteUser)



module.exports = userRoutes