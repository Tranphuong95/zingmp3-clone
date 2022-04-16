import React from 'react';
import "./index.scss";

export const Input: React.FC<{ label: string, id: string }> = ({ label, id, ...inputProps }) => {
  return (
    <div className='TextField__root'>
      <label id={id?id + "-" + "label": "label"} htmlFor={id}>{label}</label>
      <div className='input-base-root'>
        <input {...inputProps} placeholder=" " id={id} />
        <fieldset aria-hidden="true" className='TextField-outline'>
          <legend>
            <span>{label}</span>
          </legend>
        </fieldset>
      </div>
    </div>
  )
}
const CustomForm = () => {
  return (
    <div>CustomForm</div>
  )
}

export default CustomForm