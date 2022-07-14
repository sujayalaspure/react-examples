import React from "react";
import styled from "styled-components";

function item({ onClick, label, active }) {
  return (
    <Container onClick={onClick}>
      <Label active={active}>{label}</Label>
    </Container>
  );
}

export default item;

const Container = styled.div`
  height: 50px;
  /* background-color: var(--white); */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 24px;
  cursor: pointer;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  transition: 0.5s;
  /* background-color: $shocking-pink; */
  /* width: 1rem; */
  /* transform: translateX(-100%) translateY(-100%); */
  /* mix-blend-mode: screen; */
  /* animation: ripple 1250ms ease-out forwards, fade 1500ms ease-out forwards; */
`;

const Label = styled.span`
  font-size: 1rem;
  /* color: ${(props) => (props.active ? "var(--dark-slate)" : "var(--white)")}; */
`;
