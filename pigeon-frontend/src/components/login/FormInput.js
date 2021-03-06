import React from 'react'

const FormInput = ({ label, id, type, name, onChange, values, errors, error }) => {
  const hasError = errors[name] && values.touchedInputs[name]

  const errorMessage = () => {
    if (error) {
      return <div className="form-error-message">{error}</div>
    } else if (hasError) {
      return <div className="form-error-message">{errors[name]}</div>
    }
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={hasError || error ? 'form-error' : ''}
        type={type}
        name={name}
        onChange={onChange}
        value={values[name] || ''}
      />
      {errorMessage()}
    </div>
  )
}

export default FormInput
