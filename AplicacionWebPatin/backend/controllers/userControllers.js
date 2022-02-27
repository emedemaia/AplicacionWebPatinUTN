const userModel = require('../Models/userModel')//Acá está el modelo del schema que utilizo para crear el usuario
const adminModel = require('../Models/adminModel')
const joi = require('joi')
const bcryptjs = require('bcryptjs')
const { userGenerateAccessToken } = require('../validation/validation')
const { adminGenerateAccessToken } = require('../validation/validation')
require('dotenv').config





const userJoiSchema = joi.object({
    name: joi.string().min(2).required(),
    lastName: joi.string().min(2).required(),
    email: joi.string().email(),
    password: joi.string().pattern(new RegExp('^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*]){6,}'))

})




const createNewUser = async (req, res) => {
    const user = await userModel.find().where({ email: req.body.email });
    const admin = await adminModel.find().where({ email: req.body.email });
    if (user[0] || admin[0]) return res.status(400).json({ error: 'Email already exists' })

    try {

        await userJoiSchema.validateAsync({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })

        const password = await bcryptjs.hash(req.body.password, 10);

        const data = {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            vip: req.body.vip,
            password: password
        }
        const newUser = new userModel(data)
        newUser.save().then(response => {
            res.json(data)
        }).catch(error => {
            console.log(error)
            res.send(error)
            res.end
        })

    } catch (error) {
        res.status(400).send(error.details[0].message)
    }



}



const getAllUsers = (req, res) => {
    userModel.find().then(response => {
        res.send(response)
    }).catch(error => {
        console.log(error)
    })
}

const getUserById =  (req, res) => {
    
   userModel.findById(req.params.id).then(response => {
        res.send(response)
        console.log(response, 'del backend')
    }).catch(error =>{
        console.log(error)
    })
    
}


const updateUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body)
        res.json(user.data)
    } catch (error) {
        res.status(404).send({ error: 'Usuario no encontrado' })
    }
}

const createNewPassword = async (req, res) => {
    
    const user = await userModel.find().where({ email: req.body.email })

    console.log('usuario encontrado',user)
  
    if (user[0]) {
        const hashPassword = user[0].password
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
        const passwordUpdate = await userModel.findByIdAndUpdate(req.params.id, req.body)
           
        res.json(passwordUpdate)

    } catch (error) {
        res.status(404).send({ error: 'contraseña no pudo ser modificada' })
    }

    
}

const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id)
        res.send({ message: `El usuario ${user} ha sido eliminado` })
        
    } catch (error) {
        res.status(404).send({ error: 'Usuario no encontrado' })
    }
}


const loginUserAdmin = async (req, res) => {

    const user = await userModel.find().where({ email: req.body.email })
    if (user[0]) {
        const hashPassword = user[0].password
        const compare = await bcryptjs.compare(req.body.password, hashPassword)
        if (compare) {
            const userData = {
                id: user[0].id,
                name: user[0].name,
                lastName: user[0].lastName,
                email: user[0].email,
                vip: user[0].vip
            }
            const accessToken = await userGenerateAccessToken(userData)
            res.json({ status: 'ok', Token: accessToken, dataDelUsuario: userData })
         
        } else {

            res.json({ status: 'el email y/o contraseña son incorrectos' })
        }
    } else {

        const admin = await adminModel.find().where({ email: req.body.email })
        if (admin[0]) {
            const hashPassword = admin[0].password
            const compare = await bcryptjs.compare(req.body.password, hashPassword)
            if (compare) {
                const adminData = {
                    id: admin[0].id,
                    name: admin[0].name,
                    lastName: admin[0].lastName,
                    admin: admin[0].admin,
                    email: admin[0].email
                }
                const adminAccessToken = await adminGenerateAccessToken(adminData)
                res.json({ status: 'ok', Token: adminAccessToken, dataDelUsuario: adminData })
            } else {

                res.json({ status: 'el email y/o contraseña son incorrectos' })
            }
        } else {
            res.json({ error: 'el email y/o contraseña son incorrectos' })
        }
    }

}


module.exports = { createNewUser, getAllUsers, updateUser, deleteUser, loginUserAdmin, getUserById, updatePassword, createNewPassword }