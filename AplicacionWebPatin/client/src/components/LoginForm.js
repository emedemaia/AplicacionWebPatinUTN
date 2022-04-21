import React, { useContext, useState } from "react";
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
import { Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { LoginContext } from "../helpers/Context";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import * as Yup from 'yup';



export const LoginForm = () => {

    const { setIsLogged } = useContext(LoginContext)
   
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
  

   
    function handleClick() {
        navigate('/')
    }

    const handleClickShowPassword = () => {
        setShowPassword((prevValue) => !prevValue);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },


        validationSchema: Yup.object({
            email: Yup.string('Ingrese su email').email('Ingrese un email válido').required('El email es requerido'),
            password: Yup.string('Ingrese su contraseña').matches(new RegExp('^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*]){6,}'), 'La contraseña debe tener un mínmo de 6 entre letras mayúsculas y minúsculas, números y caracteres especiales (!@#$%^&*)').min(6, 'La contraseña debe tener un mínmo de 6 caracteres').required('La contraseña es requerida')
        }),
        onSubmit: async (values) => {

            try {
                const response = await axios.post('/api/users/login', values)

                if (response.data.Token) {
                    setIsLogged(prevState => !prevState)
                    localStorage.setItem('isAuthenticated', response.data.Token)
                    localStorage.setItem('userValues', JSON.stringify(response.data.dataDelUsuario))
                    handleClick()
                } else {
                    setError('usuario y/o contraseña incorrectos o no existen')
                }
            } catch (error) {
                console.log(error)
                setError('Server failed')
            }
        },
    })

    return (
        <div style={{ backgroundColor: '#FFA19B', padding: '60px', borderRadius: '10px' }}>
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
                    <Stack spacing={2} style={{ alignItems: 'center' }} >

                        <TextField
                            required
                            id="email"
                            label="email"
                            name="email"
                            value={formik.values.email}
                            type="email"
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            autoFocus
                        />
                    

                        <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
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

                        <Button variant="contained" style={{ width: '20ch', backgroundColor: '#A7F4E6', color: '#5D6473' }} size="medium" type="submit">Login</Button>
                        <Typography variant="body2" style={{ color: 'red' }}>
                            {error}
                        </Typography>
                    </Stack>
                </Box>
            </div>
        </div>



    )
}
