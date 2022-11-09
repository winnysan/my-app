import { createContext, useState } from 'react'

export const Context = createContext()

export function ContextProvider({ children }) {
  const [badge, setBadge] = useState(false)

  return <Context.Provider value={{ badge, setBadge }}>{children}</Context.Provider>
}
