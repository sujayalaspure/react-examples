import React from "react";
import styled from "styled-components";

function ParkingLocations({ status, floor, id }) {
  return (
    <Container status={status}>
      <div>
        <span>{`${id}`}</span>
        {status && <p>Reserved</p>}
      </div>
    </Container>
  );
}

export default ParkingLocations;

const Container = styled.div`
  /* background-color: hsl(10, 50%, 100%); */
  border-style: dotted;
  border-color: #000;
  border-width: 1px 0 1px 1px;
  height: 50px;
  width: 100px;
  background-color: ${(_) => (_.status ? "#F15A3077" : "hsl(10, 50%, 100%)")};
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 1px; */
  p {
    color: gray;
    font-size: 12px;
  }
`;
