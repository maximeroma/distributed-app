import React, {Component} from "react"
import {Redirect} from "@reach/router"

export default class extends Component {
  componentDidMount() {
    window.localStorage.clear()
    this.props.setIsAuthenticated(false)
  }

  render() {
    return <Redirect to="/login" noThrow />
  }
}
