import React from "react"
import render from "testUtils"
import {wait, fireEvent} from "react-testing-library"
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

test("i am redirect to login page after visited logout path", async () => {
  const {getByText} = render(<App />)

  fireEvent.click(getByText(/log out/i))

  await wait(() => expect(getByText(/login page/i)).toBeInTheDocument())
})
