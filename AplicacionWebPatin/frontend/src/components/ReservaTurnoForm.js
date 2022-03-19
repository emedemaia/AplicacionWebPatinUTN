import React, { useContext, useState } from 'react';
import { StorageContext } from "../helpers/Context";
import { useFormik } from 'formik';
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';



export const ReservaTurnoForm = () => {
    const { userValues } = useContext(StorageContext)
    const userValuesObj = JSON.parse(userValues)


    const formik = useFormik({
        initialValues: {
            date: '',
            time: ''
        },

        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post(`http://localhost:3001/api/turnos/crearTurno/${userValuesObj.id}`, values)
                resetForm()
                window.alert(JSON.stringify(response.data.message))
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
                    </FormControl>

                    <Button variant="contained" style={{ width: '20ch', backgroundColor: '#A7F4E6', color: '#5D6473' }} size="medium" type="submit">Reservar Turno</Button>

                </Stack>


            </Box>

        </>
    )
}
