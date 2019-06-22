import React from "react"
import {render as renderRTl} from "@testing-library/react"
import axios from "axios"
import AppProvider from "AppProvider"
import MockAdapter from "axios-mock-adapter"
import App from "App"

export const render = ui => {
  const component = renderRTl(<AppProvider>{ui}</AppProvider>)

  return component
}

export const mock = new MockAdapter(axios)
