import React from "react"
import {render, fireEvent, wait} from "react-testing-library"
import {navigate} from "@reach/router"
import App from "../../App"
import {addUser, getUsers} from "../../services/users"

jest.mock("../../services/users", () => ({
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

  await navigate("/register")
  expect(getByLabelText(/password/i)).toBeInTheDocument()
  expect(getByLabelText(/username/i)).toBeInTheDocument()
  expect(getByLabelText(/email/i)).toBeInTheDocument()
})

test("i can handle form correctly", async () => {
  const {getByLabelText, getByText, debug} = render(<App />)
  await navigate("/register")

  fireEvent.change(getByLabelText(/username/i), {
    target: {value: "maxime"}
  })
  fireEvent.change(getByLabelText(/email/i), {
    target: {value: "roma@gmail.com"}
  })
  fireEvent.change(getByLabelText(/password/i), {
    target: {value: "1234567"}
  })

  expect(getByText(/sign up/i)).not.toBeDisabled()

  fireEvent.submit(getByText(/sign up/i))

  expect(getByText(/sign up/i)).toBeDisabled()
  await flushPromises()

  expect(getByLabelText(/username/i).value).toEqual("")
  expect(getByLabelText(/email/i).value).toEqual("")
  expect(getByLabelText(/password/i).value).toEqual("")
})
