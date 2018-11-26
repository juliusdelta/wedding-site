import React from "react";

export default function Input(props) {
  const { htmlFor, type, id, name, disabled, value, onChange, required, text } = props;

  return (
    <label htmlFor={htmlFor}>
      {text}
      <input
        type={type}
        id={id}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        required={required}
      />
    </label>
  );
}
