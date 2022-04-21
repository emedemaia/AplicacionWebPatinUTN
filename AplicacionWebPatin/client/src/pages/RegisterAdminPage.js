import React from 'react'
import { RegisterAdminForm } from '../components/RegisterAdminForm'
import Grid from '@mui/material/Grid';



export const RegisterAdminPage = () => {
    return (
        <>
            <div style={{ background: 'no-repeat center/100% url("./images/registeradmin.jpg")', height: '100%', width: '100%', position: 'absolute' }}>
                <div style={{ position: 'absolute', top: '10%', left:'50%' }}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <RegisterAdminForm />
                    </Grid>
                </div>
            </div>
        </>
    )
}
