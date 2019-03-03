import React, {Fragment} from "react"
import {Formik} from "formik"
import Field from "./fields"

const signUp = () => Promise.resolve()

const Register = ({isMounted, ...rest}) => (
  <Fragment>
    <h1 className="title is-1">Register page</h1>
    <Formik
      initialValues={{email: "", username: "", password: ""}}
      onSubmit={(values, actions) => {
        signUp(values).then(() => {
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
              name="username"
              placeholder="Enter a username"
              label="Username"
            />
          </div>
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
            className="button is-primary is-large is-fullwidth"
            type="submit"
            disabled={isValidating || isSubmitting}
          >
            Sign up
          </button>
        </form>
      )}
    </Formik>
  </Fragment>
)

export default Register
