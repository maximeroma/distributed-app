import React from "react"
import {Router} from "@reach/router"
import Home from "routes/home"
import About from "routes/about"
import Logout from "routes/logout"
import NavBar from "components/navbar"
import UserStatus from "routes/status"

export default () => {
  return (
    <Router>
      <NavBar path="/">
        <Home path="/" />
        <About path="about" />
        <UserStatus path="/status" />
        <Logout path="/logout" />
      </NavBar>
    </Router>
  )
}
