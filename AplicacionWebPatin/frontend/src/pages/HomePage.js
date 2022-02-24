import { Typography } from '@mui/material';
import React from 'react'
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { FirstPage } from './FirstPage';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';
import { RegisterAdminPage } from './RegisterAdminPage';







export const HomePage = () => {


  return (
    <BrowserRouter>

      <nav style={{backgroundColor:'#F4D29C'}}>
        <ul style={{ display: 'flex', margin: '0 0 0 0', padding:'0' }}>
          <Link to='/'  className={'tablink'}>
            <Typography variant="button">
              <li className={'liTab'}>Página Principal</li>
            </Typography>
          </Link>
          <Link to='/LoginPage' className={'tablink'}>
            <Typography variant="button">
              <li className={'liTab'}>Login</li>
            </Typography>
          </Link>
          <Link to='/RegisterPage'  className={'tablink'} >
            <Typography variant="button">
              <li className={'liTab'}>Registrarse</li>
            </Typography>
          </Link>
         
        </ul>
      </nav>

      <Routes>
        <Route exact path="/" element={<FirstPage />} />
        <Route exact path="/LoginPage" element={<LoginPage  />} />
        <Route exact path="/RegisterPage/*" element={<RegisterPage />} />
        <Route exact path="/RegisterAdminPage" element={<RegisterAdminPage />} />
      </Routes>


    </BrowserRouter>
  )
}

