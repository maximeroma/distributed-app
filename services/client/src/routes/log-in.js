import React, {Fragment} from "react"
import {Formik} from "formik"
import Field from "components/fields"
import {Redirect} from "@reach/router"
import {useAuth} from "hooks/auth"

const LogIn = ({login, ...rest}) => {
  const {isAuthenticated, setIsAuthenticated} = useAuth()
  if (isAuthenticated) {
    return <Redirect to="/" noThrow />
  }

  return (
    <Fragment>
      <h1 className="title is-1">Login page</h1>
      <Formik
        initialValues={{email: "", password: ""}}
        onSubmit={(values, actions) => {
          login(values)
            .then(data => {
              window.localStorage.setItem("authToken", data.auth_token)
              setIsAuthenticated(true)
            })
            .catch(err => actions.setSubmitting(false))
        }}
      >
        {({handleSubmit, isValidating, isSubmitting}) => (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <Field
                className="input is-large"
                name="email"
                placeholder="Enter your email"
                label="Email"
              />
            </div>
            <div className="field">
              <Field
                className="input is-large"
                name="password"
                type="password"
                placeholder="Enter your password"
                label="Password"
              />
            </div>

            <button
              data-testid="login-btn"
              className="button is-primary is-large is-fullwidth"
              type="submit"
              disabled={isValidating || isSubmitting}
            >
              Log in
            </button>
          </form>
        )}
      </Formik>
    </Fragment>
  )
}

export default LogIn
