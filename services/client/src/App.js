import React, {Component} from "react"
import {Router} from "@reach/router"
import Home from "routes/home"
import About from "routes/about"
import Logout from "routes/logout"
import NavBar from "components/navbar"
import Login from "routes/log-in"
import UserStatus from "routes/status"
import Register from "routes/register"
import {signUp, login} from "services/auth"
import {AuthProvider} from "hooks/auth"
import "./App.css"

export default () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <NavBar path="/">
            <Home path="/" />
            <About path="about" />
            <Register path="/register" signUp={signUp} />
            <UserStatus path="/status" />
            <Login path="/login" login={login} />
            <Logout path="/logout" />
          </NavBar>
        </Router>
      </AuthProvider>
    </div>
  )
}
