import React from "react"
import {fireEvent, wait, act} from "react-testing-library"
import {navigate} from "@reach/router"
import App from "App"
import {render, mock} from "testUtils"

jest.mock("services/auth", () => ({
  login: jest.fn(data => Promise.resolve({data}))
}))

mock.onPost("/auth/login").reply(200, {})

const flushPromises = async () => new Promise(resolve => setImmediate(resolve))

test("i can see user form correctly", async () => {
  const {debug, getByLabelText} = render(<App />)

  await navigate("/login")
  expect(getByLabelText(/password/i)).toBeInTheDocument()
  expect(getByLabelText(/email/i)).toBeInTheDocument()
})

test("i can handle form correctly", async () => {
  const {getByLabelText, getByTestId, getByText} = render(<App />)
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
