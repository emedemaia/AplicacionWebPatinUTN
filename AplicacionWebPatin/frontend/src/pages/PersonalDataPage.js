import React from 'react'
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { DeleteAccount } from '../components/DeleteAccount'
import { PasswordUpdateForm } from '../components/PasswordUpdateForm'
import { PersonalDataForm } from '../components/PersonalDataForm'


export const PersonalDataPage = () => {
  const handleClickVolver = () => {
    window.location.assign('/')
  }
  return (
    <div>
      <h3>Datos Personales</h3>

      <p>Desde esta página podrás modificar tus datos personales</p>
      <Stack spacing={2} style={{ alignItems: 'center' }}>
        <PersonalDataForm />
        <PasswordUpdateForm />
        <DeleteAccount />
        <Button variant="contained" style={{ width: '20ch', backgroundColor: '#43D9BD' }} size="medium" onClick={handleClickVolver}>Volver</Button>
      </Stack>
    </div>
  )
}
