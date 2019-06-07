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

  return errors
}

export default validate
