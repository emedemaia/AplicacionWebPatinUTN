const express = require('express')
const userRoutes = express.Router()
const { createNewUser, updateUser, loginUserAdmin, getUserById, deleteUser, updatePassword, createNewPassword, getAvatarFromId } = require('../controllers/userControllers')
const { userVerifyToken } = require('../validation/validation')
const multer = require('multer');
const path = require('path');
const mime = require('mime');
const userModel = require('../Models/userModel');
const fs = require('fs')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let ruta = '../../client/public/avatar/' + req.params.id

        fs.mkdirSync(ruta, { recursive: true }, (err) => {
            if (err) throw err;
          });
        
       
            cb(null, ruta)

        
       
      }
,
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        ext = ext.length > 1 ? ext : '.' + mime.extension(file.mimetype);
        var sufijo = Date.now();
        cb(null,file.fieldname + req.params.id + "_" + sufijo + ext)

    }
});



var upload = multer({ storage: storage });



//Sólo quiero las rutas

userRoutes.get('/userbyid/:id', getUserById)

userRoutes.post('/registro', createNewUser)

userRoutes.put('/updateUser/:id', userVerifyToken, updateUser)

userRoutes.post('/createPassword', userVerifyToken, createNewPassword)

userRoutes.put('/updatePassword/:id', userVerifyToken, updatePassword)

userRoutes.post('/login', loginUserAdmin)

userRoutes.delete('/deleteUser/:id', userVerifyToken, deleteUser)

userRoutes.post('/createAvatar/:id', upload.single('avatar'), async (req, res, next) => {

    try {


        let obj = {

            avatar: {
                path: req.file.path,
                filename: req.file.filename,
                contentType: req.file.mimetype

            },

        }

        console.log(obj)
        const user = await userModel.findByIdAndUpdate(req.params.id, obj)
        
        res.json(user)


    } catch (error) {
        console.log(`upload.single error: ${error}`);

    }
})

userRoutes.get('/getAvatar/:id', getAvatarFromId)



module.exports = userRoutes