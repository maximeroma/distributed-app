import React from "react"
import {wait, fireEvent} from "react-testing-library"
import App from "App"
import {render} from "testUtils"

test("i am redirect to login page after visited logout path", async () => {
  const {getByText} = render(<App />)

  fireEvent.click(getByText(/log out/i))

  await wait(() => expect(getByText(/login page/i)).toBeInTheDocument())
})
