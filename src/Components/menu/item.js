import React from "react"
import styled from "styled-components"

function item({ onClick, label, active, path }) {
  return (
    <Container onClick={onClick}>
      <Label active={active}>{label}</Label>
      <Icon href={path}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px">
          <path d="M 4 4 L 4 44 A 2.0002 2.0002 0 0 0 6 46 L 44 46 A 2.0002 2.0002 0 0 0 46 44 L 46 32 L 42 32 L 42 42 L 8 42 L 8 4 L 4 4 z M 35.978516 4.9804688 A 2.0002 2.0002 0 0 0 34.585938 8.4140625 L 37.171875 11 L 36.048828 11 C 25.976906 10.74934 19.618605 12.315463 15.953125 16.726562 C 12.287645 21.137662 11.831327 27.512697 12 36.039062 A 2.0003814 2.0003814 0 1 0 16 35.960938 C 15.835673 27.654299 16.533777 22.2844 19.029297 19.28125 C 21.524817 16.2781 26.334094 14.76066 35.951172 15 L 35.974609 15 L 37.171875 15 L 34.585938 17.585938 A 2.0002 2.0002 0 1 0 37.414062 20.414062 L 43.236328 14.591797 A 2.0002 2.0002 0 0 0 43.619141 14.208984 L 44.828125 13 L 43.619141 11.791016 A 2.0002 2.0002 0 0 0 43.228516 11.400391 L 37.414062 5.5859375 A 2.0002 2.0002 0 0 0 35.978516 4.9804688 z" />
        </svg>
      </Icon>
    </Container>
  )
}

export default item

const Container = styled.div`
  height: 50px;
  /* background-color: var(--white); */
  display: flex;
  justify-content: space-between;
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
`

const Label = styled.span`
  font-size: 1rem;
  /* color: ${(props) => (props.active ? "var(--dark-slate)" : "var(--white)")}; */
`

const Icon = styled.a`
  width: 1rem;
  /* transform: translateX(-100%) translateY(-100%); */
`
