import * as SecureStore from 'expo-secure-store'
import { createContext, useState } from 'react'
import { URI } from '../graphql/client'
import axios from 'axios'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  async function login(name, password) {
    await axios
      .post(`https://${URI}/login`, { name, password })
      .then(response => {
        SecureStore.setItemAsync('user', JSON.stringify(response.data))
        setUser(response.data.user)
        console.info('[login]', response.data)
      })
      .catch(error => console.error(error))
  }

  async function logout() {
    setUser(null)
    SecureStore.deleteItemAsync('user')
    console.info('[logout]')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
