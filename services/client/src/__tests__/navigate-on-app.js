import React from "react"
import {Router, navigate} from "@reach/router"
import {render} from "react-testing-library"
import App from "App"

jest.mock("services/users", () => ({
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

test("by default i am on the home page", async () => {
  const {getByText} = render(<App />)

  expect(getByText(/all users/i)).toBeInTheDocument()
})

test("i am on the about page", async () => {
  const {getByText, debug} = render(<App />)

  await navigate("/about")

  expect(getByText(/about/i)).toBeInTheDocument()
})
