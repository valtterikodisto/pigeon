import React from 'react'
import FormInput from './FormInput'
import useForm from '../../hooks/useForm'
import validateLogin from '../../helpers/validators/validateLogin'

const LoginForm = ({ login, loginError }) => {
  // What we will do after successful login
  const callback = () => login(values.username, values.password)

  const { values, errors, handleChange, handleSubmit } = useForm(callback, validateLogin)

  return (
    <div className="login-section">
      <div className="form-header">
        <p>
          Log in to <span>Pigeon</span>
        </p>
      </div>

      <form id="login-form" onSubmit={handleSubmit} autoComplete="off">
        <FormInput
          label="Username"
          id="login-username"
          type="text"
          name="username"
          onChange={handleChange}
          values={values}
          errors={errors}
          error={loginError ? 'Invalid username or password' : ''}
        />
        <FormInput
          label="Password"
          id="login-password"
          type="password"
          name="password"
          onChange={handleChange}
          values={values}
          errors={errors}
          error={loginError ? 'Invalid username or password' : ''}
        />
        <div className="form-group">
          <button className="form-submit-button" type="submit">
            Log in
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
