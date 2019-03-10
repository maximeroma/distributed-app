import React from "react"
import {render, fireEvent, wait} from "react-testing-library"
import App from "../../App"
import * as users from "services/users"
import "testUtils"

const flushPromises = async () => new Promise(resolve => setImmediate(resolve))

test("i can see user form correctly", () => {
  const {debug, getByLabelText} = render(<App />)

  expect(getByLabelText(/username/i)).toBeInTheDocument()
  expect(getByLabelText(/email/i)).toBeInTheDocument()
})

test("i can handle form correctly", async () => {
  jest.spyOn(users, "addUser")
  const {getByLabelText, getByText, debug} = render(<App />)

  fireEvent.change(getByLabelText(/username/i), {
    target: {value: "maxime"}
  })
  fireEvent.change(getByLabelText(/email/i), {
    target: {value: "roma@gmail.com"}
  })

  expect(getByText(/submit/i)).not.toBeDisabled()

  fireEvent.submit(getByText(/submit/i))

  expect(getByText(/submit/i)).toBeDisabled()
  await flushPromises()
  expect(users.addUser).toHaveBeenCalled()
  expect(users.addUser.mock.calls[0][0]).toMatchInlineSnapshot(`
Object {
  "email": "roma@gmail.com",
  "username": "maxime",
}
`)
  expect(getByLabelText(/username/i).value).toEqual("")
  expect(getByLabelText(/email/i).value).toEqual("")
})
