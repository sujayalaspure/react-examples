import React from "react";
import styled from "styled-components";
import Entry from "./Entry";

function RightSide({ lastBooked, onsubmit, count }) {
  console.log("lastBooked -->", lastBooked);
  return (
    <Container>
      <Entry empty={count} onsubmit={onsubmit} />
      {lastBooked && (
        <LastBooked>
          <h1>Last Booked</h1>
          <h2>
            Vehicle: <span>{lastBooked.data.carType}</span>
          </h2>
          <h2>
            Lot Id: <span>{lastBooked.lotId}</span>
          </h2>
          <h2>
            Time: <span>{lastBooked.data.entryTime}</span>
          </h2>
        </LastBooked>
      )}
    </Container>
  );
}

export default RightSide;

const Container = styled.div`
  /* background-color: #f5f; */
  padding: 5rem 1rem;
  border-left: 1px solid #ccc;
`;

const LastBooked = styled.div`
  background-color: whitesmoke;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  h1 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  h2 {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    span {
      font-weight: 400;
      font-size: 0.9rem;
    }
  }
`;
