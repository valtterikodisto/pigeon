// useForm hook calls validation function with values parameter
// values = { username: 'givenUsername', password: 'givenPassword' }

const validate = values => {
  let errors = {}

  // Validation rules

  if (!values.firstName) {
    errors.firstName = 'First name required'
  } else if (values.firstName && !(values.firstName.length <= 20)) {
    errors.firstName = 'Maximum length is 20'
  }

  if (!values.lastName) {
    errors.lastName = 'Last name required'
  } else if (values.lastName && !(values.lastName.length <= 20)) {
    errors.lastName = 'Maximum length is 20'
  }

  if (!values.username) {
    errors.username = 'Username is required'
  } else if (values.username && !(values.username.length >= 3)) {
    errors.username = 'Minimum length is 3'
  } else if (values.username && !(values.username.length <= 20)) {
    errors.username = 'Maximum length is 20'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  } else if (!values.password.length >= 8) {
    errors.password = 'Minimum length is 8'
  } else if (values.password && !(values.password.length <= 100)) {
    errors.password = 'Maximum length is 100'
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}

export default validate
