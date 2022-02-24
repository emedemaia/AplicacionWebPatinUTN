import React, { useContext, useState } from 'react'
import { UserByIdContext  } from "../helpers/Context";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';



export const UserDataForm = () => {


    const [error, setError] = useState('')


    const { userById } = useContext(UserByIdContext)

    const homePage = () => {
        window.location.assign('/getallusers')
    }

    const formik = useFormik({
        initialValues: {
            id: userById.id,
            name: userById.name,
            lastName: userById.lastName,
            email: userById.email,
            vip: userById.vip,


        },
        validationSchema: Yup.object({
            name: Yup.string('Ingrese su nombre').required('Su nombre es requerido'),
            lastName: Yup.string('Ingrese su apellido').required('Su apellido es requerido'),
            email: Yup.string('Ingrese su email').email('Ingrese un email válido').required('El email es requerido'),
            vip: Yup.string('Vip tiene que ser Sí o No').required()

        }),


        onSubmit: async (values) => {
            try {
                const response = await axios.put(`http://localhost:3001/api/users/updateUser/${userById.id}`, values)
                console.log('respuesta de axios user', response)
                window.alert('EL usuario ha sido modificado exitosamente')
                homePage()
            } catch (error) {
                console.log(error)
                setError('Ha ocurrido un error, intente nuevamente')

            }
        }
    })

    console.log('formik values', formik.initialValues)


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
                        disabled
                        id="outlined-disabled"
                        label="id"
                        name="id"
                        type="text"
                        value={formik.values.id}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}

                    />
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Nombre"
                        name="name"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}

                    />
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Apellido"
                        name="lastName"
                        type="text"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}

                    />
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="email"
                        name="email"
                        value={formik.values.email}
                        type="email"
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}

                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Vip"
                        name="vip"
                        value={formik.values.vip}
                        type="text"
                        onChange={formik.handleChange}
                        error={formik.touched.vip && Boolean(formik.errors.vip)}
                        helperText={formik.touched.vip && formik.errors.vip}
                    />

                    <Button variant="contained" style={{ width: '20ch', backgroundColor: '#5D6473' }} size="medium" type="submit">Guardar Cambios</Button>
                    <Typography variant="caption">
                  
                        {error}
                    </Typography>
                </Stack>
            </Box>

        </div>
    )
}






