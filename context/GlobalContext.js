import { createContext } from "react"

const GlobalContext = createContext({
    user: null,
    isAuthenticated: null,
    setUser: null,
    handleSetUser: null,
    cart: null,
    addItem: null,
    removeItem: null,
  }, null)

export default GlobalContext