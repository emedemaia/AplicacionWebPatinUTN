import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { UserDataPage } from '../pages/UserDataPage'
import { UserByIdContext } from "../helpers/Context";
import { Button } from '@mui/material';


export const GetAllUsers = () => {


  const [userList, setUserList] = useState([])
  const [setError] = useState('')
  const [userById, setUserById] = useState('')


  const allUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/allusers',
        {
          headers: { authorization: localStorage.getItem('isAuthenticated') }

        })
      console.log(response.data)
      setUserList(response.data)

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    allUsers()

  }, [])

  const navigate = useNavigate()

  const handleClickDataPage = () => {
    navigate('datapage')
  }

  const handleClickClean = () => {
    window.location.assign('/getallusers')
  }
  console.log('Ésta es la lista de usuarios', userList)

  const formik = useFormik({
    initialValues: {
      id: '',
    },

    onSubmit: async (values) => {
      console.log(values.id)
      try {
        const response = await axios.get(`http://localhost:3001/api/users/userbyid/${values.id}`, values)
        console.log('respuesta de axios getuserbyid', response.data)
     

        if (response.data === "") {
          window.alert('Id incorrecto')

        } else {
          setUserById(response.data)
          handleClickDataPage()
        }

      } catch (error) {
        console.log(error)
        setError('Ha ocurrido un error, intente nuevamente')

      }
    }
  })

  return (
    <>    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">VIP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user) => (

            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{user.id}</TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.vip}</TableCell>
            </TableRow>

          ))}

        </TableBody>
      </Table>
    </TableContainer>

      <Typography variant='h6'>
        Modificar dato VIP del usuario
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '40ch', height: '25%' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}

      >
        <Stack spacing={2} style={{ alignItems: 'center' }}>
          <TextField

            id="id"
            label="Ingresa el número de id"
            name="id"
            type="text"
            value={formik.values.id}
            onChange={formik.handleChange}
            placeholder='Ingresa el número de id'

          />

          <Button variant="contained" style={{ width: '20ch', backgroundColor: '#5D6473' }} size="medium" type='submit'>Buscar</Button>
          <Button variant="contained" style={{ width: '20ch', backgroundColor: '#5D6473' }} size="medium" onClick={handleClickClean}>Limpiar</Button>

        </Stack>
      </Box>



      <Routes>
        <Route path='/datapage/*' element={
          <UserByIdContext.Provider value={{ userById, setUserById }}>
            <UserDataPage />
          </UserByIdContext.Provider>
        } />
      </Routes>

    </>

  )
}

