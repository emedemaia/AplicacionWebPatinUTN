import React from 'react'
import Typography from '@mui/material/Typography';
import { GetAllUsers } from '../components/GetAllUsers';




export const GetAllUsersPage = () => {


  return (
    <div>
      <Typography variant="h6">
        Todos Los Usuarios
      </Typography>
      <GetAllUsers />

    </div>
  )
}
