import React from "react"
import {Field as FormikField} from "formik"

const Field = ({label, name, ...props}) => {
  return (
    <FormikField name={name}>
      {({field}) => (
        <label htmlFor={field.name}>
          {label}
          <input id={field.name} {...field} {...props} />
        </label>
      )}
    </FormikField>
  )
}

export default Field
