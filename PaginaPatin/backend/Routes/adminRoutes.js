const express = require('express')
const  { getAllUsers, deleteUser }  = require('../controllers/userControllers')
const { createNewAdmin, getAllAdmins, homeAdmin, getAdminById, updateAdmin} = require('../controllers/adminControllers')
const { adminVerifyToken } = require('../validation/validation')
const adminRoutes = express.Router()

//Sólo quiero las rutas

adminRoutes.post('/registro', createNewAdmin)

adminRoutes.get('/allUsers', adminVerifyToken, getAllUsers)

adminRoutes.get('/adminbyid/:id',  getAdminById)

adminRoutes.get('/homeadmin', adminVerifyToken, homeAdmin)

adminRoutes.get('/allAdmins', adminVerifyToken, getAllAdmins)

adminRoutes.delete('/deleteUser/:id',  adminVerifyToken, deleteUser)

adminRoutes.put('/updateAdmin/:id', updateAdmin)


module.exports = adminRoutes