// useForm hook calls validation function with values parameter
// values = { username: 'givenUsername', password: 'givenPassword' }

const validate = values => {
  let errors = {}

  // Validation rules
  if (!values.username) {
    errors.username = 'Username is required'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }

  if (!values.confirmPassword || values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}

export default validate
