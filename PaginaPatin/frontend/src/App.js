import React, { useState, useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { HomeConditional } from "./pages/HomeConditional";
import {  LoginContext, StorageContext } from "./helpers/Context";



function App() {

  const [isLogged, setIsLogged] = useState(false);
const [userValues, setUserValues] =useState('')

  const [isAuth, setIsAuth] = useState(null);
  console.log('isAuth = ', isAuth)

  
  

  useEffect(() => {
    setIsAuth(localStorage.getItem('isAuthenticated'))
    setUserValues(localStorage.getItem('userValues'))
  }, [isLogged])
  
  
  return (
    <div >

      {!isAuth
        ?
        <LoginContext.Provider value={{ isLogged, setIsLogged }}>
          <StorageContext.Provider value={{ userValues, setUserValues }}>
          <HomePage />
          </StorageContext.Provider>
        </LoginContext.Provider>
        :
        
        <LoginContext.Provider value={{ isLogged, setIsLogged }}>
            <StorageContext.Provider value={{ userValues, setUserValues }}>
          <HomeConditional />
          </StorageContext.Provider>
        </LoginContext.Provider>
      
      }

    </div>
  );
}

export default App;
