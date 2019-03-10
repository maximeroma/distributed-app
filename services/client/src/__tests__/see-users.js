import React from "react"
import {render, wait} from "react-testing-library/dist"
import App from "../App"
import "testUtils"

test("it renders users", async () => {
  const {getByText} = render(<App />)
  await wait()
  expect(getByText(/michaelherman/i)).toBeInTheDocument()
  expect(getByText(/michael/i)).toBeInTheDocument()
})
