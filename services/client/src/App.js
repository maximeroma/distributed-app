import React from "react"
import {useAuth} from "hooks/auth"
import UnAuthenticatedApp from "UnAuthenticatedApp"
import AuthenticatedApp from "AuthenticatedApp"
import "./App.css"

export default () => {
  const {data} = useAuth()
  return data ? <AuthenticatedApp /> : <UnAuthenticatedApp />
}
