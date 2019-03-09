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

test("when i logout i am redirect to login page", async () => {
  const {debug, getByLabelText} = render(<App />)

  await navigate("/login")
  expect(getByLabelText(/password/i)).toBeInTheDocument()
  expect(getByLabelText(/email/i)).toBeInTheDocument()
})
