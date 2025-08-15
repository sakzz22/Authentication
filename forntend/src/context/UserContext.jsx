import React from 'react'
import { createContext } from 'react'

export const dataContext = createContext()

function UserContext({children}) {
    const serverUrl = "http://localhost:4006"
    const value = {serverUrl}
  return (
    <dataContext.Provider value={value}>
        {children}
    </dataContext.Provider>
  )
}

export default UserContext