import React from "react"
import {Router} from "@reach/router"
import Home from "pages/home"
import About from "pages/about"
import "./App.css"

export default () => (
  <Router>
    <Home path="/" />
    <About path="about" />
  </Router>
)
