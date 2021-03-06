import React from "react"
import {wait, fireEvent} from "react-testing-library"
import NavBar from "components/navbar"
import {render} from "testUtils"
import {AuthProvider, useAuth} from "hooks/auth"

test("i see only logout button when i am logged", async () => {
  const {getByText, queryByText} = setup({authToken: "Bearer"})

  fireEvent.click(getByText(/log out/i))

  expect(getByText(/log out/i)).toBeInTheDocument()
  expect(queryByText(/register/i)).not.toBeInTheDocument()
  expect(queryByText(/log in/i)).not.toBeInTheDocument()
})

test("i see only login and register buttons when i am not logged", async () => {
  const {getByText, queryByText} = setup()

  fireEvent.click(getByText(/log in/i))

  expect(queryByText(/log out/i)).not.toBeInTheDocument()
  expect(queryByText(/register/i)).toBeInTheDocument()
  expect(queryByText(/log in/i)).toBeInTheDocument()
})

const Usage = ({authToken = null}) => {
  const {setAuthToken} = useAuth()
  setAuthToken(authToken)
  return <NavBar />
}

const setup = ({...rest}) => render(<Usage {...rest} />)
