import React from "react"
import {render as renderRTl} from "react-testing-library"
import App from "App"

const render = ui => {
  const component = renderRTl(ui)

  return {
    ...component
  }
}

export default render
