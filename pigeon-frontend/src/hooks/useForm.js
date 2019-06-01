import { useState, useEffect } from 'react'

const useForm = (callback, validate) => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isSubmitting && Object.keys(errors).length === 0) {
      console.log('No validation errors')

      callback()
    } else if (isSubmitting) {
      console.log('There was validation errors:', errors)
    }
  }, [errors])

  const handleSubmit = event => {
    if (event) {
      event.preventDefault()
    }
    setIsSubmitting(true)
    setErrors(validate(values))
  }

  const handleChange = event => {
    event.persist()
    setValues(values => ({ ...values, [event.target.name]: event.target.value }))
  }

  return { handleSubmit, handleChange, values, errors }
}

export default useForm
