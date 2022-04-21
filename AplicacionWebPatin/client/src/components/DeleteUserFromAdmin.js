import { Button } from '@mui/material'
import axios from 'axios'
import React, { useContext } from 'react'
import { UserByIdContext } from '../helpers/Context'

export const DeleteUserFromAdmin = () => {

    const { userById } = useContext(UserByIdContext)

    const homePage = () => {
        window.location.assign('/GetAllUsersPage')
    }

    const handleClick = async () => {

        if (window.confirm('eliminar?')) {
            try {
                const response = await axios.delete(`/api/admin/deleteuser/${userById.id}`,
                    { headers: { authorization: localStorage.getItem('isAuthenticated') } }
                )
                console.log('response delete', response)
                if (response.data.message === "Token inválido") {
                    window.alert('Token inválido')
                } else {
                    window.alert('Cuenta eliminada')
                    homePage()
                }




            } catch (error) {
                // window.alert(error)
            }

        }

    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Button onClick={handleClick} >Eliminar cuenta</Button>
        </div>
    )
}
