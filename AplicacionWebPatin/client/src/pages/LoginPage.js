import React from 'react'
import { LoginForm } from '../components/LoginForm'
import Grid from '@mui/material/Grid';



export const LoginPage = () => {
    return (
        <>
            <div style={{ background: 'no-repeat center/100% url("./images/fondoLogin.jpg")', height: '100vh', width: '100vw', position: 'absolute' }}>
                <div style={{  position: 'absolute', top: '25vh', left:'10%' }}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <LoginForm />
                    </Grid>
                </div>
            </div>
        </>
    )
}
