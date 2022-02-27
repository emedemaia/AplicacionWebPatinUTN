const adminModel = require('../Models/adminModel')
const userModel = require('../Models/userModel')
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
const user = await userModel.find().where({ email: req.body.email });
if (user[0] || admin[0]) return res.status(400).json({ error: 'Email already exists' })
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


const createNewPassword = async (req, res) => {
    
    const admin = await adminModel.find().where({ email: req.body.email })

    console.log('usuario encontrado',admin)
  
    if (admin[0]) {
        const hashPassword = admin[0].password
        const compare = await bcryptjs.compare(req.body.oldpassword, hashPassword)

        if (compare) {
            const newpassword = await bcryptjs.hash(req.body.newpassword, 10);
        
         res.json({password: newpassword})

        } else {

            res.send('Las contraseñas no coinciden')
        }
    }else{
        console.log('usuario no encontrado del else')
    }

}

const updatePassword = async (req, res) => {

    try {
        const passwordUpdate = await adminModel.findByIdAndUpdate(req.params.id, req.body)
           
        res.json(passwordUpdate)

    } catch (error) {
        res.status(404).send({ error: 'contraseña no pudo ser modificada' })
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


const homeAdmin = (req, res) =>{
    
    try {
      
        res.json({message:'Modo Admin '})
    } catch (error) {
        res.send({error: 'Token inválido'})
    }
    
}

module.exports = { createNewAdmin, updateAdmin, deleteAdmin, getAllAdmins, homeAdmin, getAdminById, updatePassword, createNewPassword }