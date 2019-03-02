import React from "react"
import {Formik} from "formik"
import Field from "./fields"

const AddUser = ({addUser, ...rest}) => (
  <Formik
    initialValues={{email: "", username: "", password: ""}}
    onSubmit={async (values, actions) => {
      const {error, data} = await addUser(values)
      actions.setSubmitting(false)

      if (!error) {
        actions.resetForm()
      }
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
            placeholder="Enter a email"
            label="Email"
          />
        </div>
        <div className="field">
          <Field
            className="input is-large"
            name="password"
            placeholder="Enter a password"
            label="Password"
          />
        </div>

        <button
          className="button is-primary is-large is-fullwidth"
          type="submit"
          disabled={isValidating || isSubmitting}
        >
          Submit
        </button>
      </form>
    )}
  </Formik>
)

export default AddUser
