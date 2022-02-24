import React from 'react'
import Typography from '@mui/material/Typography';





export const FirstPage = () => {
  return (
    <>
    <div style={{marginBottom:'0'}}>
        <img src={'./images/home.jpg'} width="100%" alt="fondo"/>
    </div>
    <footer style={{ backgroundColor:'#FCF3DA', textAlign:'center', color:'#5D6473', height:'30px' }} ><Typography variant="caption" display="block" style={{position:'relative', top:'5px'}}>Desarrollado por Maia I. Elías - 2022</Typography></footer>
    </>
  )
}

