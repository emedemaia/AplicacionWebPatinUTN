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


export const TurnosTable = () => {

  const { userValues } = useContext(StorageContext)
  const userValuesObj = JSON.parse(userValues)

  const [turnos, setTurnos] = useState([])


  const getTurnos = async () => {

    try {
      const response = await axios.get(`http://localhost:3001/api/turnos/turnosUsuario/${userValuesObj.id}`)

      setTurnos(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTurnos()
  })

const handleClick = async (id) =>{

  try {
if( window.confirm('¿Está seguro de que desea eliminar este turno?')){
  const response = await  axios.delete(`http://localhost:3001/api/turnos/eliminarTurno/${id}`)

window.alert(response.data)
window.location.assign('reservahecha')
}
 
  } catch (error) {
    console.log(error)
  }
}

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Fecha</TableCell>
              <TableCell align="right">Hora&nbsp;</TableCell>
              <TableCell align="right">Invitados&nbsp;</TableCell>
              <TableCell align="right">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {turnos.map((row) => (
              <TableRow
                key={row.id}
                id={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="turnoId"
                >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.time}:00 hs</TableCell>
                <TableCell align="right">{row.people}</TableCell>
                <TableCell align="right">
<IconButton onClick={() => handleClick(row.id)}> <DeleteForeverIcon className='deleteIcon'/></IconButton>
               
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Routes>
      <Route  path="/reservahecha/*" element={<TurnosPage />} />
      </Routes>
    </>
  );
}

// poner que primero deben elegir y luego eliminar, entonces poner un solo tachito de basura? así cuando apretan el checkbox creo un state que guarde el row.id y luego ejecuto ese state en axios para eliminar el turno

