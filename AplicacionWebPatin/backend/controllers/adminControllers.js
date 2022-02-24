const adminModel = require('../Models/adminModel')
const joi = require('joi')
const bcryptjs = require('bcryptjs')
// const {adminGenerateAccessToken} = require('../validation/validation')
require('dotenv').config




const adminJoiSchema = joi.object({
    name: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    birthDate: joi.date(),
    admin: joi.boolean(),
    email: joi.string().email(),
    password: joi.string().pattern(new RegExp('^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*]){6,}'))
})



const createNewAdmin = async (req, res) =>{
const admin = await adminModel.find().where({email: req.body.email})
if(admin[0]) return res.status(400).json('El email ya existe')
try {

    await adminJoiSchema.validateAsync({
        name: req.body.name,
        lastName: req.body.lastName,
        admin: true,
        email: req.body.email,
        password: req.body.password
    })

    const password = await bcryptjs.hash(req.body.password, 10);

    const data = {
        name: req.body.name,
        lastName: req.body.lastName,
        admin: true,
        email: req.body.email,
        password: password
    }
    const newAdmin = new adminModel(data)
    newAdmin.save().then(response => {
        res.send({ message: 'Admin creado', newAdmin })
    }).catch(error => {
        console.log(error)
        res.send(error)
        res.end
    })

} catch (error) {
    res.status(400).send(error.details[0].message)
}


}

const getAllAdmins = (req, res) => {
    adminModel.find().then(response => {
        res.send(response)
    }).catch(error => {
        console.log(error)
    })
}

const getAdminById =  (req, res) => {
    
    adminModel.findById(req.params.id).then(response => {
         res.send(response)
         
     }).catch(error =>{
         console.log(error)
     })
     
 }

const updateAdmin = async (req, res) => {
    try {
        const admin = await adminModel.findByIdAndUpdate(req.params.id, req.body)
        res.json(admin.data)
    } catch (error) {
        res.status(404).send({ error: 'Admin no encontrado' })
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const admin = await adminModel.findByIdAndDelete(req.params.id)
        res.send({ message: `El admin ${admin} ha sido eliminado` })
    } catch (error) {
        res.status(404).send({ error: 'Usuario no encontrado' })
    }
}

//Login
// const loginAdmin = async (req, res) => {
//     const admin = await adminModel.find().where({ email: req.body.email })
//     if (admin[0]) {
//         const hashPassword = admin[0].password
//         const compare = await bcryptjs.compare(req.body.password, hashPassword)
//         if (compare) {
//             const adminData = {
//                 name: admin[0].name,
//                 lastName: admin[0].lastName,
//                 admin: admin[0].admin,
//                 email: admin[0].email
//             }
//             const adminAccessToken = await adminGenerateAccessToken(adminData)
//             res.json({ status: 'ok', Token: adminAccessToken })
//         } else {
            
//             res.json({ status: 'el email y/o contraseña son incorrectos' })
//         }
//     } else {
//         res.json({ error: 'el email y/o contraseña son incorrectos' })
//     }

// }

const homeAdmin = (req, res) =>{
    
    try {
      
        res.json({message:'Modo Admin '})
    } catch (error) {
        res.send({error: 'Token inválido'})
    }
    
}

module.exports = { createNewAdmin, updateAdmin, deleteAdmin, getAllAdmins, homeAdmin, getAdminById }