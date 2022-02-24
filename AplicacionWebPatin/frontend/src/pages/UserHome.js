import React, { useContext } from 'react'
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
import { BrowserRouter, Link, Routes, Route, Navigate } from "react-router-dom";
import { LoginContext, StorageContext } from "../helpers/Context";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarsIcon from '@mui/icons-material/Stars';
import PhotoIcon from '@mui/icons-material/Photo';
import { AdminHome } from './AdminHome';
import { LoggedHome } from './LoggedHome';
import { PersonalDataPage } from './PersonalDataPage';
import { Button } from '@mui/material';
import { VipPage } from './VipPage';
import { AccesoNoAutorizado } from './AccesoNoAutorizado';



const drawerWidth = 240;

export const UserHome = () => {

    const { setIsLogged } = useContext(LoginContext)


    const handleLogout = () => {
        setIsLogged(prevState => !prevState)
        localStorage.clear()
    }

    const handleClickRefresh = () => {
        window.location.assign('/')
    }

    const { userValues } = useContext(StorageContext)

    const userValuesObj = JSON.parse(userValues)
    

    const tipoDeSuscripcion = userValuesObj.vip

    const PrivateRoute = ({ children }) => {
        
      return (
          tipoDeSuscripcion === 'true' ? children :  <Navigate to="/accesonoauto" /> 
            )
    }

    

    return (
        <div>

            <Box sx={{ display: 'block', width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px`, p: 3, marginTop: 6 }}>
                <BrowserRouter>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
                    >

                        <Toolbar style={{ backgroundColor: '#31988A' }}>
                            <span style={{ padding: '10px' }}><img src={'./favicon/android-chrome-512x512.png'} height='30px' alt='patin' /></span>

                            <Button onClick={handleClickRefresh} style={{ textDecoration: "none", color: "#FFF" }}>
                                <Typography variant="h6" noWrap component="div" >
                                    Pista de Patinaje Retro
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
                        {/* foto */}
                        <Toolbar />
                        <Divider />

                        <List>
                            {['Datos Personales', 'Reservá tu turno', 'Reservas hechas', 'Subí tu foto', 'Sector VIP'].map((text, index) => (
                                <Link
                                    to={index % 5 === 0 ? 'datospersonales' : index % 5 === 1 ? 'reservaturno' : index % 5 === 2 ? 'reservahecha' : index % 5 === 3 ? 'subifoto' : 'sectorvip'}
                                    style={{ textDecoration: "none", color: "#000" }}
                                    key={index}
                                >
                                    <ListItem button key={text}>
                                        <ListItemIcon>
                                            {index % 5 === 0 ?
                                                <AccountCircleIcon /> : index % 5 === 1 ?
                                                    <CalendarTodayIcon /> : index % 5 === 2 ? <EventAvailableIcon /> : index % 5 === 3 ? <PhotoIcon /> : <StarsIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                </Link>
                            ))}
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
                        <Route exact path='/datospersonales' element={<PersonalDataPage />} />
                        <Route exact path="/reservaturno" element='Reservá tu turno' />
                        <Route exact path="/reservahecha" element='Reservas hechas' />
                        <Route exact path="/subifoto" element='Subí tu foto' />
                        <Route exact path="/sectorvip" element={
                            <PrivateRoute>
                                <VipPage />
                            </PrivateRoute>
                        } />
                        <Route path="/adminhome/*" element={<AdminHome />} />
                        <Route path="/accesonoauto" element={<AccesoNoAutorizado />} />
                    </Routes>
                </BrowserRouter>
            </Box>


        </div>
    )

};
