import { Button } from '@mui/material'
import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext, StorageContext } from '../helpers/Context'

export const DeleteAccount = () => {

    const { userValues } = useContext(StorageContext)
    const { setIsLogged } = useContext(LoginContext)

    const userValuesObj = JSON.parse(userValues)

    const navigate = useNavigate()

    const homePage = () => {
        navigate('/')
    }
    const handleClick = () => {




        if (window.confirm('¿Estas segurx de que deseas eliminar tu cuenta?\nEsta acción no se puede deshacer, perderás todos tus datos y fotos.')) {
            axios.delete(`/api/users/deleteuser/${userValuesObj.id}`,
                { headers: { authorization: localStorage.getItem('isAuthenticated') } }
            )
            window.alert('Cuenta eliminada')
            setIsLogged(prevState => !prevState)
            localStorage.clear()
            homePage()
        }







    }

    return (
        <div >
            <Button onClick={handleClick}>Eliminar cuenta</Button>
        </div>
    )
}
