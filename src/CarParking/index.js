import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Entry from "./Entry";
import Floor from "./Floor";
import LeftSide from "./LeftSide";
import MiddleSection from "./MiddleSection";
import RightSide from "./RightSide";

const defaultSlots = [
  {
    id: 1,
    carType: "small",
    entryTime: "",
    exitTime: "",
    status: true,
  },
  {
    id: 2,
    carType: "small",
    entryTime: "",
    exitTime: "",
    status: true,
  },
  {
    id: 3,
    carType: "small",
    entryTime: "",
    exitTime: "",
    status: true,
  },
  {
    id: 4,
    carType: "small",
    entryTime: "",
    exitTime: "",
    status: false,
  },
  {
    id: 5,
    carType: "small",
    entryTime: "",
    exitTime: "",
    status: true,
  },
];

function CarParking() {
  const [slots, setSlots] = useState(defaultSlots);
  const [empty, setEmpty] = useState(0);
  const [dummy, setDummy] = useState(true);

  const updateSlot = (slot) => {
    console.log("slot -->", slot);
    const newSlots = slots.map((s) => {
      if (s.id === slot.id) {
        return { ...slot, status: !slot.status, exitTime: new Date() };
      }
      return s;
    });
    setSlots(newSlots);
  };
  const onsubmit = (data) => {
    console.log("entry -->", data);
    let temp = slots;
    const idx = slots.findIndex((s) => s.status === true);
    console.log("idx -->", idx);
    if (idx !== -1) {
      temp[idx].entryTime = data.entryTime;
      temp[idx].carType = data.carType;
      temp[idx].status = false;

      console.log("temp -->", temp);
      setSlots(temp);
      setDummy(!dummy);
    }
  };

  useEffect(() => {
    console.log("slots -->");
    let count = 0;
    slots.forEach((s) => {
      if (s.status) {
        count++;
      }
    });
    setEmpty(count);
  }, [slots]);

  return (
    <Container>
      <LeftSide />
      <MiddleSection />
      <RightSide />
      {/* <Entry empty={empty} onsubmit={onsubmit} /> */}
      {/* <Floor slots={slots} updateSlot={updateSlot} /> */}
    </Container>
  );
}

export default CarParking;

const Container = styled.div`
  height: 100%;
  background-color: #fff;
  display: grid;
  grid-template-columns: max-content auto max-content;
`;
