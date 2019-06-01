import React from 'react'
import useForm from '../../hooks/useForm'
import validateRegister from '../../utils/validateRegister'

const LoginForm = () => {
  // What we will do after successful login
  const callback = () => console.log('Form submitted')

  const { values, errors, handleChange, handleSubmit } = useForm(callback, validateRegister)

  return (
    <form id="login-form" onSubmit={handleSubmit} autoComplete="off">
      <div className="form-group">
        <label>Username</label>
        <input
          id="login-username"
          type="text"
          name="username"
          onChange={handleChange}
          value={values.username || ''}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          id="login-password"
          type="password"
          name="password"
          onChange={handleChange}
          value={values.password || ''}
        />
      </div>
      <div className="form-group">
        <label>Confirm password</label>
        <input
          id="login-confirmPassword"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={values.confirmPassword || ''}
        />
      </div>
      <div className="form-group">
        <button className="form-submit-button" type="submit">
          Register
        </button>
      </div>
    </form>
  )
}

export default LoginForm
