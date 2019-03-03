import React from "react"
import {Router} from "@reach/router"
import Home from "pages/home"
import About from "pages/about"
import NavBar from "components/navbar"
import Login from "components/log-in"
import Register from "components/register"
import "./App.css"

export default () => (
  <div>
    <Router>
      <NavBar path="/">
        <Home path="/" />
        <About path="about" />
        <Register path="/register" />
        <Login path="/login" />
      </NavBar>
    </Router>
  </div>
)
