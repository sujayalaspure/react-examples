import React from "react";
import styled from "styled-components";
import Floor from "./Floor";
import lotsData from "./data";
function MiddleSection() {
  return (
    <Container>
      <h1 id="name">Real-Time Car Parking Booking</h1>
      {lotsData.map((floor, index) => {
        return <Floor floor={index} slots={floor.lots} />;
      })}
    </Container>
  );
}

export default MiddleSection;

const Container = styled.div`
  padding: 2rem;
`;
