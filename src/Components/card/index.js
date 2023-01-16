import React from "react"
import styled from "styled-components"

function Card({ children, style }) {
  return <Container style={style}>{children}</Container>
}

export default Card

const Container = styled.div``
