import React, { useContext, useState } from 'react'
import { StorageContext } from "../helpers/Context";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import * as Yup from 'yup';
import { Route, Routes } from 'react-router-dom';
import { PersonalDataPage } from '../pages/PersonalDataPage';




export const PasswordUpdateForm = () => {


    const { userValues } = useContext(StorageContext)
    const userValuesObj = JSON.parse(userValues)

    console.log('valores de usuario', userValuesObj)

    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword((prevValue) => !prevValue);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowNewPassword = () => {
        setShowNewPassword((prevValue) => !prevValue);
    };

    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };

    const handleClickAdmin = async () => {
        const getadminbyid = await axios.get(`/api/admin/adminbyid/${userValuesObj.id}`)
        localStorage.setItem('userValues', JSON.stringify(getadminbyid.data))
        console.log('nuevo userValues ', userValues)

    }


    const handleClick = async () => {
        const getuserbyid = await axios.get(`/api/users/userbyid/${userValuesObj.id}`)
        localStorage.setItem('userValues', JSON.stringify(getuserbyid.data))
        console.log('nuevo userValues ', userValues)

    }


    const formik = useFormik({
        initialValues: {
            email: userValuesObj.email,
            oldpassword: '',
            newpassword: '',



        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            oldpassword: Yup.string('Ingrese su contraseña').matches(new RegExp('^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*]){6,}'), 'La contraseña debe tener un mínmo de 6 entre letras mayúsculas y minúsculas, números y caracteres especiales (!@#$%^&*)').min(6, 'La contraseña debe tener un mínmo de 6 caracteres').required('La contraseña es requerida'),

            newpassword: Yup.string('Ingrese su contraseña').matches(new RegExp('^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*]){6,}'), 'La contraseña debe tener un mínmo de 6 entre letras mayúsculas y minúsculas, números y caracteres especiales (!@#$%^&*)').min(6, 'La contraseña debe tener un mínmo de 6 caracteres').required('La contraseña es requerida')

        }),

        onSubmit: async (values, { resetForm }) => {
            try {
                if (userValuesObj.admin) {
                    const responsePwdAdmin = await axios.post('/api/admin/createPassword', values,
                        { headers: { authorization: localStorage.getItem('isAuthenticated') } })

                    console.log('respuesta de axios admin', responsePwdAdmin.data)

                    if (responsePwdAdmin.data) {

                        const updatePassword = await axios.put(`/api/admin/updatePassword/${userValuesObj.id}`, { password: responsePwdAdmin.data.password }, {
                            headers: {
                                authorization: localStorage.getItem('isAuthenticated'),
                            }
                        })

                        console.log('contraseña modif', updatePassword)

                        window.alert('La contraseña ha sido modificada exitosamente')
                        handleClickAdmin()
                        resetForm();
                    } else {
                        console.log('no se pudo crear la nueva contraseña')
                    }

                } else {

                    const responsePwdUser = await axios.post('/api/users/createPassword', values,
                        {
                            headers: {
                                authorization: localStorage.getItem('isAuthenticated'),
                            }
                        }
                    )
                    console.log('respuesta de axios create pwd user', responsePwdUser.data)


                    if (responsePwdUser.data) {

                        const updatePassword = await axios.put(`/api/users/updatePassword/${userValuesObj.id}`, { password: responsePwdUser.data.password }, {
                            headers: {
                                authorization: localStorage.getItem('isAuthenticated'),
                            }
                        })

                        console.log('contraseña modif', updatePassword)

                        window.alert('La contraseña ha sido modificada exitosamente')
                        handleClick()
                        resetForm();
                    } else {
                        console.log('no se pudo crear la nueva contraseña')
                    }


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
                    <input
                        type="hidden"
                        id="email"
                        label="email"
                        name="email"
                        value={formik.values.email}

                    />
                    <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Contraseña Actual</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            value={formik.values.oldpassword}
                            name="oldpassword"
                            onChange={formik.handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Ingrese su contraseña actual"
                            placeholder="Ingrese su contraseña actual"
                            error={formik.touched.oldpassword && Boolean(formik.errors.oldpassword)}
                        />
                        <FormHelperText sx={{ m: 1, width: '40ch' }}
                            id="component-error-text"
                            error={formik.touched.oldpassword && Boolean(formik.errors.oldpassword)}
                        >
                            {formik.touched.oldpassword && formik.errors.oldpassword}
                        </FormHelperText>
                    </FormControl>


                    <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Contraseña Nueva</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showNewPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            value={formik.values.newpassword}
                            name="newpassword"
                            onChange={formik.handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowNewPassword}
                                        onMouseDown={handleMouseDownNewPassword}
                                        edge="end"
                                    >
                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Ingrese su nueva contraseña"
                            placeholder="Ingrese su nueva contraseña"
                            error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                        />
                        <FormHelperText sx={{ m: 1, width: '40ch' }}
                            id="component-error-text"
                            error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                        >
                            {formik.touched.newpassword && formik.errors.newpassword}
                        </FormHelperText>
                    </FormControl>

                    <Button variant="contained" style={{ width: '25ch', backgroundColor: '#F26E50' }} size="medium" type="submit">Guardar Cambios</Button>

                    <Typography variant="caption">
                        {error}
                    </Typography>
                </Stack>
            </Box>
            <Routes>
                <Route exact path="/PersonalDataPage" element={<PersonalDataPage />} />
            </Routes>

        </div>
    )
}






