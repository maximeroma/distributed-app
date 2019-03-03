import React, {Fragment} from "react"
import {Formik} from "formik"
import Field from "./fields"

const logIn = () => Promise.resolve()

const LogIn = ({isMounted, ...rest}) => (
  <Fragment>
    <h1 className="title is-1">Login page</h1>
    <Formik
      initialValues={{email: "", password: ""}}
      onSubmit={(values, actions) => {
        logIn(values).then(() => {
          actions.setSubmitting(false)
          actions.resetForm()
        })
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

export default LogIn
