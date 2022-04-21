import React, { useContext } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { GetAllUsersPage } from './GetAllUsersPage'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { LoginContext } from "../helpers/Context";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PhotoIcon from '@mui/icons-material/Photo';
import { LoggedHome } from './LoggedHome';
import { PersonalDataPage } from './PersonalDataPage';
import { Button } from '@mui/material';


const drawerWidth = 240;

export const AdminHome = () => {

  const { setIsLogged } = useContext(LoginContext)


  const handleLogout = () => {
    setIsLogged(prevState => !prevState)
    localStorage.clear()
  }

  const handleClickRefresh = () => {
    window.location.assign('/')
  }

  return (
    <>
      <BrowserRouter>
        <Box sx={{ display: 'block', width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px`, p: 3, marginTop: 6 }}>

          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
          >

            <Toolbar style={{ backgroundColor: '#31988A' }}>
              <span style={{ padding: '10px' }}><img src={'./favicon/android-chrome-512x512.png'} height='30px' alt='patin' /></span>
              <Button onClick={handleClickRefresh} style={{ textDecoration: "none", color: "#FFF" }}>
                <Typography variant="h6" noWrap component="div" >
                  Pista de Patinaje Retro |  Bienvenid@ a la zona de l@s administradores
                </Typography>
              </Button>
            </Toolbar>
          </AppBar>


          <Drawer
            sx={{
              width: 20,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="permanent"
            anchor="right"
          >
            <Toolbar />
            <Divider />

            <List>
              {['Datos Personales', 'Reservas hechas', 'Administrador de fotos', 'Novedades'].map((text, index) => (
                <Link
                  to={index % 4 === 0 ? 'datospersonales' : index % 4 === 1 ? 'reservashechas' : index % 4 === 2 ? 'adminfotos' :  'novedades' }
                  style={{ textDecoration: "none", color: "#000" }}
                  key={index}
                >
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 4 === 0 ?
                        <AccountCircleIcon /> : index % 4 === 1 ?
                          <CalendarTodayIcon /> : index % 4 === 2 ? <EventAvailableIcon /> : <PhotoIcon /> }
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <Divider />


            <List>
              <Link to={'getallusers'}
                style={{ textDecoration: "none", color: "#000" }}>
                <ListItem button >
                  <ListItemIcon>
                    {<LogoutIcon />}
                  </ListItemIcon>
                  <ListItemText>
                    Lista de Usuarios
                  </ListItemText>
                </ListItem>
              </Link>
              
            </List>
            <Divider />

            <List>
              <Link to={'/'}
                style={{ textDecoration: "none", color: "#000" }}>
                <ListItem button onClick={() => handleLogout()}>
                  <ListItemIcon>
                    {<LogoutIcon />}
                  </ListItemIcon>
                  <ListItemText>
                    Logout
                  </ListItemText>
                </ListItem>
              </Link>
            </List>

          </Drawer>
          <Routes>
            <Route exact path="/" element={<LoggedHome />} />
            <Route exact path='/datospersonales/*' element={<PersonalDataPage />} />
            <Route exact path="/reservashechas" element='Reservas hechas' />
            <Route exact path="/adminfotos" element='Administrador de fotos' />
            <Route exact path="/novedades" element='Novedades' />
            <Route exact path='/getallusers/*' element={<GetAllUsersPage />} />
           
          </Routes>

        </Box>
      </BrowserRouter>
    </>
  )
}
