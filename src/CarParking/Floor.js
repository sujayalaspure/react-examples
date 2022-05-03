/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ParkingLocations from "./components/ParkingLocations";
import "./style.css";

function Floor({ floor, slots, updateSlot }) {
  const [data, setData] = useState(slots);
  useEffect(() => {
    setData(slots);
  }, []);

  return (
    <Container>
      <FloorNumber>
        <span>Floor {floor}</span>
      </FloorNumber>
      <ParkingLotsWrapper>
        {data?.map((slot) => {
          return <ParkingLocations floor={floor} {...slot} />;
        })}
      </ParkingLotsWrapper>
    </Container>
  );
}

export default Floor;

const Container = styled.div`
  margin: 16px 0;
  max-width: 1000px;
  background-color: antiquewhite;
`;
const ParkingLotsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FloorNumber = styled.div`
  height: auto;
  padding: 0.5rem 1rem;
  background-color: var(--accent-tint);
  width: max-content;
  margin-bottom: 0.5rem;
  border-radius: 8px;
`;
