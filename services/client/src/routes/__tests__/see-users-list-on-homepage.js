import React from "react"
import {render, wait} from "testUtils"
import Home from "../home"

test("see user list", async () => {
  const {getByText} = render(<Home />)
  await wait()
  getByText("maxime")
  getByText("maxime@roma.com")
})
