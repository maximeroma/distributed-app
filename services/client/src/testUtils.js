import React from "react"
import {render as renderRTl} from "react-testing-library"
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import App from "App"

export const render = ui => {
  const component = renderRTl(ui)

  return {
    ...component
  }
}

export const mock = new MockAdapter(axios)

const users = [
  {
    active: true,
    email: "hermanmu@gmail.com",
    id: 1,
    username: "michael"
  },
  {
    active: true,
    email: "michael@mherman.org",
    id: 2,
    username: "michaelherman"
  }
]

mock
  .onGet(`/users`)
  .reply(200, {data: {users}})
  .onAny()
  .reply(200)
