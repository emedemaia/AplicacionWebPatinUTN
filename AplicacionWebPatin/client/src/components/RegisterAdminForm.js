import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Stack } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

export const RegisterAdminForm = () => {

    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false);


    const handleClickShowPassword = () => {
        setShowPassword((prevValue) => !prevValue);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = () => {
        setOpen(prevState => !prevState);
    };

    const handleClickLogin = () => {
        window.location.assign('/LoginPage')
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string('Ingrese su nombre').required('Su nombre es requerido'),
            lastName: Yup.string('Ingrese su apellido').required('Su apellido es requerido'),
            email: Yup.string('Ingrese su email').email('Ingrese un email válido').required('El email es requerido'),
            password: Yup.string('Ingrese su contraseña').matches(new RegExp('^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*]){6,}'), 'La contraseña debe tener un mínmo de 6 entre letras mayúsculas y minúsculas, números y caracteres especiales (!@#$%^&*)').min(6, 'La contraseña debe tener un mínmo de 6 caracteres').required('La contraseña es requerida')
        }),

        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('/api/admin/registro', values)
                console.log(response.data)
                if (response.data.email) {
                    window.alert('Usuario creado, será redirigido a la página de login para ingresar')
                    resetForm()
                    handleClickLogin()

                } else {
                    window.alert('El usuario NO ha sido creado')
                }
            } catch (error) {
                console.log(error)
                setError('El usuario ya existe')
                setOpen(prevState => !prevState);
            }
        }
    })



    return (
        <div style={{ backgroundColor: '#A7F4E6', padding: '60px', borderRadius: '10px' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px' }}>

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
                        <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                value={formik.values.password}
                                onChange={formik.handleChange('password')}
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
                                label="Contraseña"
                                error={formik.touched.password && Boolean(formik.errors.password)}
                            />
                            <FormHelperText sx={{ m: 1, width: '40ch' }}
                                id="component-error-text"
                                error={formik.touched.password && Boolean(formik.errors.password)}
                            >
                                {formik.touched.password && formik.errors.password}
                            </FormHelperText>
                        </FormControl>

                        <Button variant="contained" style={{ width: '20ch', backgroundColor: '#5D6473' }} size="medium" type="submit">Registrarse</Button>
                    </Stack>
                </Box>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={6000}>
                    <Alert severity="error" variant="filled">{error}</Alert>
                </Snackbar>
               
            </div>

        </div>



    )
}
