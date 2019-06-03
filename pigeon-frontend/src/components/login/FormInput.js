import React from 'react'

const FormInput = ({ label, id, type, name, onChange, values, errors }) => {
  const error = () => {
    if (errors[name] && values.touchedInputs[name]) {
      return <div className="form-error-message">{errors[name]}</div>
    }
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} name={name} onChange={onChange} value={values[name] || ''} />
      {error()}
    </div>
  )
}

export default FormInput
