import React from 'react'
import { RegisterForm } from '../components/RegisterForm'
import Grid from '@mui/material/Grid';



export const RegisterPage = () => {
    return (
        <>
            <div style={{ background: 'no-repeat center/100% url("./images/fondoRegister.jpg")', height: '100%', width: '100%', position: 'absolute' }}>
                <div style={{ position: 'absolute', top: '10%', left:'50%' }}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <RegisterForm />
                    </Grid>
                </div>
            </div>
        </>
    )
}
