import React, { useState, useEffect, useContext } from 'react';
import { StorageContext } from "../helpers/Context";
import { Routes, Route } from "react-router-dom";
import { TurnosPage } from '../pages/TurnosPage';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { Checkbox, Typography } from '@mui/material';


export const TurnosTable = () => {

  const { userValues } = useContext(StorageContext)
  const userValuesObj = JSON.parse(userValues)

  const [turnos, setTurnos] = useState([])
  const [message, setMessage] = useState("")
  const [ids, setIds] = useState([])
  // const [checked, setChecked] = useState([true, false])
  const [checked, setChecked] = useState(false)

  const getTurnos = async () => {

    try {
      const response = await axios.get(`/api/turnos/turnosUsuario/${userValuesObj.id}`)
      
if (response.data.error) {
setMessage(response.data)

} else {
  setTurnos(response.data)

}
     

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTurnos()
  }, [])




  const handleClick = async (id) => {
  
    try {
      if (window.confirm('¿Está seguro de que desea eliminar este turno?')) {
        const response = await axios.delete(`/api/turnos/eliminarTurno/${id}`)

        window.alert(response.data)
        window.location.assign('reservahecha')
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (id) => {
    // setChecked([checked[0], event.target.checked]);
    // setChecked(prevState => !prevState)
    setIds(ids.concat(id))
    // if(checked === true){
    //   setIds(ids.concat(id))
    // }else{
    //   setIds(ids.filter((item) => item !== id))
    // }
  }

  const handleClickAll =  () => {

  try {
    if (window.confirm('¿Está seguro de que desea eliminar los turnos seleccionados?')) {

      ids.forEach(element => {
        console.log("element.id", element)
     axios.delete(`/api/turnos/eliminarTurno/${element}`)
    })
    window.location.assign('/TurnosPage')
    }

  } catch (error) {
    console.log(error)
  }
}

const handleChangeAll = () => {
  // setChecked(true);
  //USAR USEREF
  const myCheck = document.getElementsByClassName("myCheckbox")
  console.log(myCheck)
  // myCheck.checked = true
}

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
            <TableCell padding='checkbox'>
              {/* <Checkbox size='small' onChange={handleChangeAll}/> */}
            </TableCell>
              <TableCell>ID</TableCell>
              <TableCell align="right">Fecha</TableCell>
              <TableCell align="right">Hora&nbsp;</TableCell>
              <TableCell align="right">Invitados&nbsp;</TableCell>
              <TableCell align="right">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {turnos.map((row) => {
              const fecha = new Date(row.date)
              fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset())
              return (
                <TableRow
                  key={row.id}
                  id={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  className="turnoId"
                >
                <TableCell padding='checkbox'>
              {/* <Checkbox size='small' onChange={() => handleChange(row.id)} checked={checked}/> */}
              <Checkbox size='small' onChange={() => handleChange(row.id)} className="myCheckbox"/>
            </TableCell>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{fecha.toLocaleDateString('es-MX')}</TableCell>
                  <TableCell align="right">{row.time}:00 hs</TableCell>
                  <TableCell align="right">{row.people}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleClick(row.id)}> <DeleteForeverIcon className='deleteIcon' /></IconButton>

                  </TableCell>
                </TableRow>
              )
            })}
            <TableRow>
                <TableCell align="right">
                    <IconButton onClick={handleClickAll}> <DeleteForeverIcon className='deleteIcon' /></IconButton>
                  </TableCell>
                </TableRow>
          </TableBody>
        </Table>
         </TableContainer>
         <Typography variant="subtitle2" style={{color: "red", textAlign:"center", marginTop:"20px"}}>{message.error}</Typography>

      <Routes>
        <Route path="/TurnosPage/*" element={<TurnosPage />} />
      </Routes>
    </>
  );
          
}

// poner que primero deben elegir y luego eliminar, entonces poner un solo tachito de basura? así cuando apretan el checkbox creo un state que guarde el row.id y luego ejecuto ese state en axios para eliminar el turno

