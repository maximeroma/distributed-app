import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import AppProvider from "AppProvider"
import App from "App"

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
)
