import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import { UserHome } from './UserHome'

export const AccesoNoAutorizado = () => {

    const handleClickVolver = () => {
        window.location.assign('/')
    }

    return (
        <div>
            <Stack   spacing={2}>
                <Typography variant="h6">
                    Acceso No Autorizado
                </Typography>

                <Button variant="contained" style={{ width: '25ch', backgroundColor: '#FFA19B' }} size="medium" onClick={handleClickVolver}>Volver al Home</Button>
            </Stack>

            <Routes>
                <Route exact path='/userhome' element={<UserHome/>} />
            </Routes>
        </div>
    )
}
