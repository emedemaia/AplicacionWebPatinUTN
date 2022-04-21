import React from 'react'
import Button from '@mui/material/Button';
import { Divider, Stack } from '@mui/material';
import { DeleteAccount } from '../components/DeleteAccount'
import { PasswordUpdateForm } from '../components/PasswordUpdateForm'
import { PersonalDataForm } from '../components/PersonalDataForm'
import { ChangeAvatar } from '../components/ChangeAvatar';
import { Route, Routes } from 'react-router-dom';


export const PersonalDataPage = () => {
  const handleClickVolver = () => {
    window.location.assign('/')
  }
  return (
    <div>

      <div style={{width:'100%', textAlign:'center', marginBottom:'50px'}}>
      <h3>Datos Personales</h3>

      <p>Desde esta página podrás modificar tus datos personales</p>
      </div>
      <Stack spacing={2} direction="row" style={{justifyContent:'space-between'}}>
        <PersonalDataForm />
        <PasswordUpdateForm />
        <ChangeAvatar />
      </Stack>
      <Divider />
      <Stack spacing={2} >
        <div style={{ textAlign: 'right', marginTop: '20px' }}>
          <DeleteAccount />
          <Button variant="contained" style={{ width: '20ch', backgroundColor: '#43D9BD' }} size="medium" onClick={handleClickVolver}>Volver</Button>
        </div>
      </Stack>

     
    </div>
  )
}
