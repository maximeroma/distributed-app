import React from "react"
import {render, wait} from "react-testing-library"
import App from "App"
import axios from "axios"

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({data: {data: {users: []}}}))
}))

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

axios.get.mockImplementation(() => Promise.resolve({data: {data: {users}}}))

test("it renders users", async () => {
  const {getByText} = render(<App />)
  await wait()
  expect(getByText(/michaelherman/i)).toBeInTheDocument()
  expect(getByText(/michael/i)).toBeInTheDocument()
  expect(getUsers).toHaveBeenCalled()
})
