import React from "react";
import styled from "styled-components";
import Entry from "./Entry";

function RightSide() {
  return (
    <Container>
      <Entry empty={0} onsubmit={onsubmit} />
    </Container>
  );
}

export default RightSide;

const Container = styled.div`
  background-color: #f5f;
`;
