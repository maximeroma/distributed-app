import React, {Component} from "react"
import {Router} from "@reach/router"
import Home from "routes/home"
import About from "routes/about"
import Logout from "routes/logout"
import NavBar from "components/navbar"
import Login from "routes/log-in"
import Register from "routes/register"
import {signUp, login} from "services/auth"
import "./App.css"

export default class extends Component {
  state = {
    isAuthenticated: false
  }

  handleSignup = data => {
    this.setState({isAuthenticated: true})
    return signUp(data)
  }

  handleLogin = data => {
    return login(data)
  }

  setIsAuthenticated = isAuthenticated => {
    this.setState(() => ({isAuthenticated}))
  }

  render() {
    return (
      <div>
        <Router>
          <NavBar path="/">
            <Home path="/" />
            <About path="about" />
            <Register
              path="/register"
              signUp={signUp}
              isAuthenticated={this.state.isAuthenticated}
              setIsAuthenticated={this.setIsAuthenticated}
            />
            <Login
              path="/login"
              login={login}
              isAuthenticated={this.state.isAuthenticated}
              setIsAuthenticated={this.setIsAuthenticated}
            />
            <Logout
              path="/logout"
              isAuthenticated={this.state.isAuthenticated}
              setIsAuthenticated={this.setIsAuthenticated}
            />
          </NavBar>
        </Router>
      </div>
    )
  }
}
