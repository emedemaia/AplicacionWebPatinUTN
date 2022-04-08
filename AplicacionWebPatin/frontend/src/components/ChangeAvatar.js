import { Button, Stack, Typography } from '@mui/material'
import React, { useContext, useState} from 'react'
import { StorageContext } from "../helpers/Context";
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { PersonalDataPage } from '../pages/PersonalDataPage';





export const ChangeAvatar = () => {
    const { userValues } = useContext(StorageContext)
    const userValuesObj = JSON.parse(userValues)

   
    const [avatarUpload, setAvatarUpload] = useState({ avatar: '' })

    function previewImage(e) {
        var reader = new FileReader();
        var fileToRead = document.getElementById('uploadImage').files[0];



        reader.onload = function (e) {
            document.getElementById('uploadPreview').src = e.target.result;
        };

        reader.readAsDataURL(fileToRead);
        console.log('file to read', fileToRead)


        var inputImage = document.getElementById('imgPreview');
        var att = document.createAttribute('value');
        att.value = "imagen";
        inputImage.setAttributeNode(att);
        setAvatarUpload({ avatar: e.target.files[0] })
        console.log(avatarUpload)
 


    };

   

    const HandleSumbit =  (event) => {




        try {

         
                event.preventDefault()
                const formDataAvatar = new FormData()
                formDataAvatar.append('avatar', avatarUpload.avatar)
                 axios.post(`http://localhost:3001/api/users/createAvatar/${userValuesObj.id}`, formDataAvatar).then(_res => {
                    window.location.assign('datospersonales')
                })


      


        } catch (error) {
            console.log(error)

        }
    }



    return (
        <div>
            <Stack spacing={2}>
                <Typography variant="h6" style={{ marginBottom: '20px', textAlign: 'center' }}>
                    Imagen de perfil
                </Typography>
                <div style={{ textAlign: 'center' }}>

                    <img width='100' alt='avatar' style={{ borderRadius: '50px' }} src='avatar/avatar0.png' id='uploadPreview' />

                </div>

                <form onSubmit={HandleSumbit} id="avatarForm" name="avatarForm" encType="multipart/form-data">


                    <input type="file" id="uploadImage" accept="image/jpeg, image/png" onChange={previewImage} />

                    <input type="hidden" id="imgPreview" />

                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <Button variant="contained" style={{ width: '20ch', backgroundColor: '#43D9BD' }} type="submit" >Actualizar</Button>
                    </div>
                </form>
            </Stack>

            <Routes>
                <Route  path='/datospersonales/*' element={<PersonalDataPage />} />
            </Routes>

        </div>
    )
}
