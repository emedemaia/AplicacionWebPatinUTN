import { Typography } from '@mui/material'
import React from 'react'
import { ReservaTurnoForm } from '../components/ReservaTurnoForm'

export const ReservaTurnoPage = () => {
  return (
    <>
     <div style={{ width: '100%', textAlign: 'center', marginBottom: '50px' }}>
        <h3> ¡Desde acá podrás reservar tu turno para patinar!</h3>
      </div>

   <Typography variant="subtitle2">
   ¿Por qué sacar un turno?
   </Typography>
  <Typography variant='body2'>Para poder asegurarte patinar solo o con tus amig@s, ya que la pista presenta una capacidad de 200 personas y de esta manera todos pueden disfrutar.</Typography> 
  <br/>
  <Typography variant="subtitle2">
  ¿Podés acercarte sin turno? 
   </Typography>
   <Typography variant='body2'>Claro que sí!, pero corrés el riesgo de tener que esperar y de que si venís en un grupo muy grande, que el turno que le sigue no posea la capacidad para que ingreses, por eso siempre es recomendable reservar.</Typography>
   <br/>
   <Typography variant="subtitle2">
   ¿Cómo sacás turno?
   </Typography>
   <Typography variant='body2'> Seleccioná en el siguiente formulario fecha y hora y listo! se te va a enviar a tu mail un correo con el turno asignado, así que asegurate de ingresar bien el mismo.</Typography>
  <div style={{marginTop: "60px"}}>
    <ReservaTurnoForm />
  </div>

    </>
  )
}
