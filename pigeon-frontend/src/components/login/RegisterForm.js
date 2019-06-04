import React from 'react'
import FormInput from './FormInput'
import useForm from '../../hooks/useForm'
import validateRegister from '../../utils/validateRegister'

const LoginForm = () => {
  // What we will do after successful login
  const callback = () => console.log('User registered')

  const { values, errors, handleChange, handleSubmit } = useForm(callback, validateRegister)

  return (
    <div className="register-section">
      <div className="form-header">
        <p>
          Register to <span>Pigeon</span>
        </p>
      </div>

      <form id="login-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-multiple-group">
          <FormInput
            label="First name"
            id="register-firstName"
            type="text"
            name="firstName"
            onChange={handleChange}
            values={values}
            errors={errors}
          />
          <FormInput
            label="Last name"
            id="register-lastName"
            type="text"
            name="lastName"
            onChange={handleChange}
            values={values}
            errors={errors}
          />
        </div>
        <FormInput
          label="Username"
          id="register-username"
          type="text"
          name="username"
          onChange={handleChange}
          values={values}
          errors={errors}
        />
        <div className="form-multiple-group">
          <FormInput
            label="Password"
            id="register-password"
            type="password"
            name="password"
            onChange={handleChange}
            values={values}
            errors={errors}
          />
          <FormInput
            label="Confirm password"
            id="register-confirmPassword"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            values={values}
            errors={errors}
          />
        </div>
        <div className="form-group">
          <button className="form-submit-button" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
