import React, {useState, useContext} from "react"
import createPersistedState from "use-persisted-state"
import {Redirect} from "@reach/router"
import axios from "axios"

const USERS_SERVICE_URL = process.env.REACT_APP_USERS_SERVICE_URL

const AuthContext = React.createContext()

const AuthProvider = ({...props}) => {
  const useAuthTokenState = createPersistedState("auth_token")
  const [authToken, setAuthToken] = useAuthTokenState(null)

  const login = data =>
    axios
      .post(`${USERS_SERVICE_URL}/auth/login`, data)
      .then(({data}) => {
        if (data.auth_token) {
          setAuthToken(data.auth_token)
          return data
        }

        throw new Error("login error")
      })
      .catch(err => console.log(err))

  const signUp = data =>
    axios
      .post(`${USERS_SERVICE_URL}/auth/register`, data)
      .then(({data}) => {
        if (data.auth_token) {
          setAuthToken(data.auth_token)
          return data
        }

        throw new Error("register error")
      })
      .catch(err => console.log(err))

  const logout = () => {
    setAuthToken(null)
  }

  return (
    <AuthContext.Provider
      value={{data: authToken, login, signUp, logout, setAuthToken}}
      {...props}
    />
  )
}

const AuthConsumer = AuthContext.Consumer

const useAuth = () => useContext(AuthContext)

export {AuthContext, AuthProvider, AuthConsumer, useAuth}
