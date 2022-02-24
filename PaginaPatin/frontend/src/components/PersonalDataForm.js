import React, { useContext, useState } from 'react'
import { StorageContext } from "../helpers/Context";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';



export const PersonalDataForm = () => {


    const { userValues } = useContext(StorageContext)

    const userValuesObj = JSON.parse(userValues)

    const [exito, setExito] = useState('')
    const [error, setError] = useState('')

    const handleClickAdmin = async () => {
        const getadminbyid = await axios.get(`http://localhost:3001/api/admin/adminbyid/${userValuesObj.id}`)
        localStorage.setItem('userValues', JSON.stringify(getadminbyid.data))
        console.log('nuevo userValues ', userValues)
        
    }


    const handleClick = async () => {
        const getuserbyid = await axios.get(`http://localhost:3001/api/users/userbyid/${userValuesObj.id}`)
        localStorage.setItem('userValues', JSON.stringify(getuserbyid.data))
        console.log('nuevo userValues ', userValues)
        
    }

    const handleClickVolver = () => {
      window.location.assign('/')
    }

    const formik = useFormik({
        initialValues: {
            name: userValuesObj.name,
            lastName: userValuesObj.lastName,
            email: userValuesObj.email,

        },
        validationSchema: Yup.object({
            name: Yup.string('Ingrese su nombre').required('Su nombre es requerido'),
            lastName: Yup.string('Ingrese su apellido').required('Su apellido es requerido'),
            email: Yup.string('Ingrese su email').email('Ingrese un email válido').required('El email es requerido'),

        }),

        onSubmit: async (values) => {
            try {
                if (userValuesObj.admin) {
                    const responseAdmin = await axios.put(`http://localhost:3001/api/admin/updateAdmin/${userValuesObj.id}`, values)
                    console.log('respuesta de axios admin', responseAdmin)

                    setExito('EL usuario ha sido modificado exitosamente')
                    handleClickAdmin()
                } else {
                    const response = await axios.put(`http://localhost:3001/api/users/updateUser/${userValuesObj.id}`, values)
                    console.log('respuesta de axios user', response)

                    setExito('EL usuario ha sido modificado exitosamente')
                    handleClick()

                }

            } catch (error) {
                console.log(error)
                setError('Ha ocurrido un error, intente nuevamente')

            }
        }
    })


    return (
        <div>



            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch', height: '25%' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}

            >
                <Stack spacing={2} style={{ alignItems: 'center' }}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Nombre"
                        name="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Apellido"
                        name="lastName"
                        type="text"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="email"
                        name="email"
                        value={formik.values.email}
                        type="email"
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />


                    <Button variant="contained" style={{ width: '20ch', backgroundColor: '#5D6473' }} size="medium" type="submit">Guardar Cambios</Button>
                    <Button variant="contained" style={{ width: '20ch', backgroundColor: '#5D6473' }} size="medium" onClick={handleClickVolver}>Volver</Button>
                    <Typography variant="caption">
                        {exito}
                        {error}
                    </Typography>
                </Stack>
            </Box>

        </div>
    )
}






