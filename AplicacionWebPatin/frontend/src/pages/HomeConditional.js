import React, { useContext } from 'react'
import { StorageContext } from '../helpers/Context'
import { AdminHome } from './AdminHome'
import { UserHome } from './UserHome'

export const HomeConditional = () => {

    const { userValues } = useContext(StorageContext)

    const userValuesObj = JSON.parse(userValues)
    const adminTrue = userValuesObj.admin

    
    return (
        <div>
            {
                adminTrue === true
                    ?
                    <AdminHome />
                    :
                    <UserHome />
            }


        </div>
    )
}
