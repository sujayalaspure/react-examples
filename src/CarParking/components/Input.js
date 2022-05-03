import React from "react";
import styled from "styled-components";

function Input({ placeholder, type, onChange, name, value, other }) {
  return (
    <InputWrapper placeholder={placeholder} name={name} value={value} onChange={onChange} type={type} {...other} />
  );
}

export default Input;

const InputWrapper = styled.input`
  background-color: #fff;
  padding: 0.5rem;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
