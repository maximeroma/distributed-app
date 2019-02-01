import React from "react"
import {Formik} from "formik"
import Field from "./fields"

const AddUser = ({addUser, isMounted, ...rest}) => (
  <Formik
    initialValues={{email: "", username: ""}}
    onSubmit={(values, actions) => {
      addUser(values).then(() => {
        actions.setSubmitting(false)
        actions.resetForm()
      })
    }}
  >
    {({handleSubmit}) => (
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

        <button
          className="button is-primary is-large is-fullwidth"
          type="submit"
        >
          Submit
        </button>
      </form>
    )}
  </Formik>
)

export default AddUser
