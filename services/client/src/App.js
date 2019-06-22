import React, {useEffect} from "react"
import {useAuth} from "hooks/auth"
import {navigate} from "@reach/router"
import UnAuthenticatedApp from "UnAuthenticatedApp"
import AuthenticatedApp from "AuthenticatedApp"
import "./App.css"

export default () => {
  const {data} = useAuth()
  useEffect(() => {
    if (!data) {
      navigate("/login")
    }
  }, [data])

  return data ? <AuthenticatedApp /> : <UnAuthenticatedApp />
}
