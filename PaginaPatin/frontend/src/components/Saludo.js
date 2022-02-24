import React, { useContext} from "react";
import { StorageContext } from "../helpers/Context";


export const Saludo = () => {

  const { userValues } = useContext(StorageContext)

  const userValuesObj = JSON.parse(userValues)

   console.log('userValues desde Saludo', userValuesObj)


  return (
    <div>Bienvenid@ a la pista, {userValuesObj.name} {userValuesObj.lastName}</div>
  )
}
