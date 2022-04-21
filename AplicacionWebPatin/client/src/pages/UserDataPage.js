import React from 'react'
import { DeleteUserFromAdmin } from '../components/DeleteUserFromAdmin'
import { UserDataForm } from '../components/UserDataForm'

export const UserDataPage = () => {


    return (
        <div>
           
            <UserDataForm />
            <DeleteUserFromAdmin />

        </div>
    )
}
