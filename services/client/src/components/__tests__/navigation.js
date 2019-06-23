import React, {useEffect} from "react"
import {fireEvent, wait} from "@testing-library/react"
import {navigate} from "@reach/router"
import cases from "jest-in-case"
import App from "../../App"
import {useAuth} from "../../hooks/auth"
import {render, mock} from "testUtils"

mock.onGet("/graphql").reply(200, {data: {allUsers: {edges: []}}})

test("i am on the main page by default", async () => {
  const {getByText} = setup()
  await wait()
  debugger
  expect(getByText(/distributed app/i)).toBeInTheDocument()
})

test("i go to the about page when i click on about link", async () => {
  const {getByText, debug} = setup()
  fireEvent.click(getByText(/about/i))
  await wait(() => expect(getByText(/about page/i)).toBeInTheDocument())
})

test("i go to the home page when i click on about home", async () => {
  const {getByText} = setup()
  await wait(() => expect(getByText(/about page/i)).toBeInTheDocument())
})

cases(
  "i navigate correctly on unauthenticated app",
  async opts => {
    const {getByText, debug} = setup({authToken: null})
    fireEvent.click(getByText(opts.link))
    await wait(() => expect(getByText(opts.page)).toBeInTheDocument())
  },
  [
    {link: /register/i, page: /register page/i},
    {link: /log in/i, page: /login page/i}
  ]
)

cases(
  "i navigate correctly on authenticated app",
  async opts => {
    const {getByText} = setup()
    fireEvent.click(getByText(opts.link))
    await wait(() => expect(getByText(opts.page)).toBeInTheDocument())
  },
  [{link: /about/i, page: /about page/i}, {link: /home/i, page: /all users/i}]
)

test("i can handle burger button", async () => {
  const {container} = setup()
  const burgerBtn = container.querySelector(".nav-toggle")
  expect(burgerBtn).not.toHaveClass("is-active")
  fireEvent.click(burgerBtn)
  expect(burgerBtn).toHaveClass("is-active")
})

const AuthenticatedApp = ({authToken = "Bearer test"}) => {
  const {setAuthToken} = useAuth()
  useEffect(() => {
    setAuthToken(authToken)
  }, [])

  return <App />
}

const setup = ({...props}) => {
  return render(<AuthenticatedApp {...props} />)
}
