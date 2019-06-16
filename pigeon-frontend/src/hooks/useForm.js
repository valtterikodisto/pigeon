import { useState, useEffect, useLayoutEffect } from 'react'

const useForm = (callback, validate) => {
  const [values, setValues] = useState({ touchedInputs: {} })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      callback()
      setIsSubmitting(false)
    } else if (isSubmitting) {
      setIsSubmitting(false)
    }
  }, [errors, callback, isSubmitting])

  useLayoutEffect(() => {
    setErrors(validate(values))
  }, [values, validate])

  const handleSubmit = event => {
    if (event) {
      event.preventDefault()
    }
    setIsSubmitting(true)

    // All input fields with error => true
    // so there will be visible error messages if any
    const namesWithErrors = {}
    Object.keys(errors).forEach(name => (namesWithErrors[name] = true))
    setValues({ ...values, touchedInputs: namesWithErrors })
  }

  const handleChange = event => {
    event.persist()
    const name = event.target.name
    const value = event.target.value
    const touchedInputs = { ...values.touchedInputs, [name]: true }

    setValues(values => ({ ...values, [name]: value, touchedInputs }))
  }

  return { handleSubmit, handleChange, values, errors }
}

export default useForm
