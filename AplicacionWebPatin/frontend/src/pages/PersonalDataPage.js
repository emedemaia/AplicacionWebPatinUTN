import React from 'react'
import { DeleteAccount } from '../components/DeleteAccount'
import { PersonalDataForm } from '../components/PersonalDataForm'


export const PersonalDataPage =  () => {
 
  return (
    <div>
      <h3>Datos Personales</h3>

      <p>Desde esta página podrás modificar tus datos personales</p>
      <PersonalDataForm />
      <DeleteAccount />

    </div>
  )
}
