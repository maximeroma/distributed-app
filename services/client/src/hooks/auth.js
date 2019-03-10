import React, {useState, useContext} from "react"

const AuthContext = React.createContext()

const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthConsumer = AuthContext.Consumer

const useAuth = () => useContext(AuthContext)

export {AuthContext, AuthProvider, AuthConsumer, useAuth}
