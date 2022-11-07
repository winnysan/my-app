import { createContext, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { URI } from '../graphql/client'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  async function login(name, password) {
    await axios
      .post(`${URI}/login`, { name, password })
      .then(response => {
        SecureStore.setItemAsync('user', JSON.stringify(response.data))
        setUser(response.data.user)
        console.log('[login]', response.data)
      })
      .catch(error => console.error(error))
  }

  async function logout() {
    setUser(null)
    SecureStore.deleteItemAsync('user')
    console.log('[logout]')
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
