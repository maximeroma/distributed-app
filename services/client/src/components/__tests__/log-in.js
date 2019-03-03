import React from "react"
import {render, fireEvent, wait} from "react-testing-library"
import {navigate} from "@reach/router"
import App from "../../App"
import {addUser, getUsers} from "../../services/users"

jest.mock("../../services/users", () => ({
  addUser: jest.fn(data => Promise.resolve({data})),
  getUsers: jest.fn(() =>
    Promise.resolve({
      data: {
        data: {
          users: []
        }
      }
    })
  )
}))

const flushPromises = async () => new Promise(resolve => setImmediate(resolve))

test("i can see user form correctly", async () => {
  const {debug, getByLabelText} = render(<App />)

  await navigate("/login")
  expect(getByLabelText(/password/i)).toBeInTheDocument()
  expect(getByLabelText(/email/i)).toBeInTheDocument()
})

test("i can handle form correctly", async () => {
  const {getByLabelText, getByText, getByTestId} = render(<App />)
  await navigate("/login")

  fireEvent.change(getByLabelText(/email/i), {
    target: {value: "roma@gmail.com"}
  })
  fireEvent.change(getByLabelText(/password/i), {
    target: {value: "1234567"}
  })

  expect(getByTestId("login-btn")).not.toBeDisabled()

  fireEvent.submit(getByTestId("login-btn"))

  expect(getByTestId("login-btn")).toBeDisabled()
  await flushPromises()

  expect(getByLabelText(/email/i).value).toEqual("")
  expect(getByLabelText(/password/i).value).toEqual("")
})
