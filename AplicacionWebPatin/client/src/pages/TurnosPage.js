import React from 'react'
import { TurnosTable } from '../components/TurnosTable'


export const TurnosPage = () => {
  return (
    <div>

      <div style={{ width: '100%', textAlign: 'center', marginBottom: '50px' }}>
        <h3>Tus turnos</h3>

        <p>Desde esta página podrás ver, administrar y eliminar tus turnos.</p>
      </div>

      <TurnosTable />
    </div>
  )
}
