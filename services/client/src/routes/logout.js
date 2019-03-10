import React, {useEffect} from "react"
import {Redirect} from "@reach/router"
import {useAuth} from "hooks/auth"

export default () => {
  const {setIsAuthenticated} = useAuth()
  useEffect(() => {
    window.localStorage.clear()
    setIsAuthenticated(false)
  }, [])

  return <Redirect to="/login" noThrow />
}
