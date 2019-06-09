import React from "react"
import {fireEvent, wait} from "react-testing-library"
import {navigate} from "@reach/router"
import App from "../../App"
import {addUser, getUsers} from "../../services/users"
import {render, mock} from "testUtils"

mock.onPost("/auth/register").reply(200, {auth_token: "Bearer test"})
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
  await wait(() => expect(getByText(/all users/i)).toBeInTheDocument())
})
