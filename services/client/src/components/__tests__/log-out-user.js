import React from "react"
import {fireEvent, wait} from "@testing-library/react"
import {navigate} from "@reach/router"
import App from "../../App"
import {mock, render} from "testUtils"

const flushPromises = async () => new Promise(resolve => setImmediate(resolve))

test("when i logout i am redirect to login page", async () => {
  const {debug, getByLabelText} = render(<App />)

  await navigate("/login")
  expect(getByLabelText(/password/i)).toBeInTheDocument()
  expect(getByLabelText(/email/i)).toBeInTheDocument()
})
