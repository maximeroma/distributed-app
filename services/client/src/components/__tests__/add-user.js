import React from "react"
import {render, fireEvent, wait} from "react-testing-library"
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

test("i can see user form correctly", () => {
  const {debug, getByLabelText} = render(<App />)

  expect(getByLabelText(/username/i)).toBeInTheDocument()
  expect(getByLabelText(/email/i)).toBeInTheDocument()
})

test("i can handle form correctly", async () => {
  const {getByLabelText, getByText, debug} = render(<App />)

  fireEvent.change(getByLabelText(/username/i), {target: {value: "maxime"}})
  fireEvent.change(getByLabelText(/email/i), {
    target: {value: "roma@gmail.com"}
  })

  expect(getByText(/submit/i)).not.toBeDisabled()

  fireEvent.submit(getByText(/submit/i))

  expect(getByText(/submit/i)).toBeDisabled()
  await flushPromises()
  expect(addUser).toHaveBeenCalled()
  expect(addUser.mock.calls[0][0]).toMatchSnapshot()
  expect(getByLabelText(/username/i).value).toEqual("")
  expect(getByLabelText(/email/i).value).toEqual("")
})
