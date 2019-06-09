import React from "react"
import {fireEvent, wait, act} from "react-testing-library"
import {navigate} from "@reach/router"
import App from "App"
import {render, mock} from "testUtils"

mock.onPost(`/auth/login`).reply(201, {auth_token: "Bearer test"})

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

mock.onGet(`/users`).reply(200, {data: {users}})

const flushPromises = async () => new Promise(resolve => setImmediate(resolve))

test("i can see user form correctly", async () => {
  const {debug, getByLabelText} = render(<App />)

  await navigate("/login")
  expect(getByLabelText(/password/i)).toBeInTheDocument()
  expect(getByLabelText(/email/i)).toBeInTheDocument()
})

test("i can handle form correctly", async () => {
  const {getByLabelText, getByTestId, getByText, debug} = render(<App />)
  await navigate("/login")

  fireEvent.change(getByLabelText(/email/i), {
    target: {value: "roma@gmail.com"}
  })
  fireEvent.change(getByLabelText(/password/i), {
    target: {value: "1234567"}
  })

  expect(getByTestId("login-btn")).not.toBeDisabled()

  fireEvent.submit(getByTestId("login-btn"))
  await flushPromises()

  await wait(() => expect(getByText(/all users/i)).toBeInTheDocument())
})
