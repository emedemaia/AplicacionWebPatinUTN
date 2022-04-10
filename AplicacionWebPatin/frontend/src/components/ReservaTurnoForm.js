import React, { useContext } from 'react';
import { StorageContext } from "../helpers/Context";
import { useFormik } from 'formik';
import { Box, Button, FormHelperText, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import * as Yup from 'yup';


export const ReservaTurnoForm = () => {
    const { userValues } = useContext(StorageContext)
    const userValuesObj = JSON.parse(userValues)

    const today = new Date()
    today.toLocaleDateString('es-MX')
    const dateToday = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    


    const formik = useFormik({
        initialValues: {
            date: '',
            time: '',
            people: ''
        },

        validationSchema: Yup.object({
            date: Yup.date('Elija una fecha').required('Elija una fecha').min(today, 'La reserva tiene que ser una fecha superior a ' + dateToday),
            time: Yup.number('Elija una hora').required('Elija una hora'),
            people: Yup.number('Ingrese cantidad de personas que van a patinar').required('Ingrese cantidad de personas que van a patinar').min(1, 'Mínimo 1 persona').max(200,'Máximo 200 personas')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post(`http://localhost:3001/api/turnos/crearTurno/${userValuesObj.id}`, values)
console.log(response)
                if (response.data.error ) {
                    window.alert(response.data.error)
                } else {
                    resetForm()
                    window.alert(response.data.message)
                }
               

                //que se vaya a la página de turnos otorgados
            } catch (error) {
                console.log(error)
            }
        }
    })


    return (

        <>



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
                        id="date"
                        type="date"
                        name="date"
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        error={formik.touched.date && Boolean(formik.errors.date)}
                        helperText={formik.touched.date && formik.errors.date}
                    />
                    <FormControl sx={{
                        m: 1, width: '40ch', height: '25%'
                    }}>
                        <InputLabel>Hora</InputLabel>
                        <Select
                            id="time"
                            name="time"
                         
                            value={formik.values.time}
                            label="Hora"
                            onChange={formik.handleChange}
                            error={formik.touched.time && Boolean(formik.errors.time)}

                        >
                            <MenuItem value={10}>10:00</MenuItem>
                            <MenuItem value={11}>11:00</MenuItem>
                            <MenuItem value={12}>12:00</MenuItem>
                            <MenuItem value={13}>13:00</MenuItem>
                            <MenuItem value={14}>14:00</MenuItem>
                            <MenuItem value={15}>15:00</MenuItem>
                            <MenuItem value={16}>16:00</MenuItem>
                            <MenuItem value={17}>17:00</MenuItem>
                            <MenuItem value={18}>18:00</MenuItem>
                            <MenuItem value={19}>19:00</MenuItem>
                            <MenuItem value={20}>20:00</MenuItem>
                            <MenuItem value={21}>21:00</MenuItem>
                            <MenuItem value={22}>22:00</MenuItem>
                        </Select>
                        <FormHelperText sx={{ m: 1, width: '40ch' }}
                            id="component-error-text"
                            error={formik.touched.time && Boolean(formik.errors.time)}
                        >
                            {formik.touched.time && formik.errors.time}
                        </FormHelperText>
                    </FormControl>
                    <TextField
                        required
                        label="Cantidad de personas"
                        id="people"
                        type="number"
                        name="people"
                        value={formik.values.people}
                        onChange={formik.handleChange}
                        error={formik.touched.people && Boolean(formik.errors.people)}
                        helperText={formik.touched.people && formik.errors.people}
                    />
                    <Button variant="contained" style={{ width: '20ch', backgroundColor: '#A7F4E6', color: '#5D6473' }} size="medium" type="submit">Reservar Turno</Button>

                </Stack>


            </Box>

        </>
    )
}
