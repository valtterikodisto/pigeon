import React from 'react'
import useForm from '../../hooks/useForm'
import validateLogin from '../../utils/validateLogin'

const LoginForm = () => {
  // What we will do after successful login
  const callback = () => console.log('Form submitted')

  const { values, errors, handleChange, handleSubmit } = useForm(callback, validateLogin)

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
        <button className="form-submit-button" type="submit">
          Login
        </button>
      </div>
    </form>
  )
}

export default LoginForm
