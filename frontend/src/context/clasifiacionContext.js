import { useState, createContext } from "react";

const Context = createContext({})

export function ClientContextProvider({ children }) {
  const [ clasificacion, setClasificacion ] = useState(null)

  return (
    <Context.Provider value={{ clasificacion, setClasificacion}}>{children}</Context.Provider>
  )
}

export default Context