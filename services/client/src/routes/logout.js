import React, {useEffect} from "react"
import {Redirect} from "@reach/router"
import {useAuth} from "hooks/auth"

export default () => {
  const {logout} = useAuth()
  useEffect(() => {
    logout()
  }, [])

  return <Redirect to="/login" noThrow />
}
