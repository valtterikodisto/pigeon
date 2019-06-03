import React from 'react'

const FormInput = ({ label, id, type, name, onChange, values, errors }) => {
  const hasError = errors[name] && values.touchedInputs[name]

  const error = () => {
    if (hasError) {
      return <div className="form-error-message">{errors[name]}</div>
    }
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={hasError ? 'form-error' : ''}
        type={type}
        name={name}
        onChange={onChange}
        value={values[name] || ''}
      />
      {error()}
    </div>
  )
}

export default FormInput
