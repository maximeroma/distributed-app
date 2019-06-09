import React from "react"
import Register from "routes/register"
import NavBar from "components/navbar"
import Login from "routes/log-in"
import {Router} from "@reach/router"

export default () => {
  return (
    <Router>
      <NavBar path="/">
        <Register path="/register" />
        <Login path="/login" />
      </NavBar>
    </Router>
  )
}
