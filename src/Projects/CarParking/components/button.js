import React from "react";
import styled from "styled-components";

function Button({ onClick, label, active, bgColor, other }) {
  return (
    <ButtonWrapper bgColor={bgColor} onClick={onclick} {...other}>
      {label}
    </ButtonWrapper>
  );
}

export default Button;

const ButtonWrapper = styled.button`
  background-color: ${(props) => props.bgColor || "lightgreen"};
  border: none;
  outline: none;
  padding: 8px;
  cursor: pointer;
`;
