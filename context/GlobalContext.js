import { createContext } from "react"

export const GlobalContext = createContext({ isAuthenticated: false })

export default GlobalContext