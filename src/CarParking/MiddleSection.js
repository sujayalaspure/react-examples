import React from "react";
import styled from "styled-components";
import Floor from "./Floor";
import lotsData from "./data";
function MiddleSection() {
  // console.log(lotsData[0].lots);
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
  /* background-color: #f50; */
  padding: 2rem;
`;
