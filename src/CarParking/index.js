import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LeftSide from "./LeftSide";
import MiddleSection from "./MiddleSection";
import RightSide from "./RightSide";
import parkingData from "./data";

function CarParking() {
  const [slots, setSlots] = useState([...parkingData]);
  const [empty, setEmpty] = useState(0);
  const [dummy, setDummy] = useState(true);
  const [lastBooked, setLastBooked] = useState(null);

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
    if (data.carType === "" || data.entryTime === "" || data.carNumber === "") {
      alert("Please enter all the details");
      return;
    }
    let idx = -1;
    const indixes = [-1, -1];

    for (let index = 0; index < slots.length; index++) {
      const s = slots[index];
      idx = s?.lots.findIndex((t) => t.status === false);
      if (idx !== -1) {
        indixes[0] = index;
        indixes[1] = idx;
        break;
      }
    }

    let temp = slots;
    if (indixes[0] !== -1 && indixes[1] !== -1) {
      temp[indixes[0]].lots[indixes[1]].status = true;
      temp[indixes[0]].lots[indixes[1]].entryTime = data.entryTime;
      temp[indixes[0]].lots[indixes[1]].carType = data.carType;
      setSlots(temp);
      setEmpty((prev) => prev - 1);

      setLastBooked({ data, lotId: `${temp[indixes[0]].id}-${temp[indixes[0]].lots[indixes[1]].id}` });
    } else {
      alert("Sorry, parking lot is full");
    }
    setDummy(!dummy);
  };

  useEffect(() => {
    let count = 0;
    slots?.forEach((s) => {
      s?.lots.forEach((l) => {
        if (l.status === false) {
          count++;
        }
      });
    });
    setEmpty(count);
  }, []);

  return (
    <Container>
      <LeftSide onsubmit={onsubmit} />
      <MiddleSection />
      <RightSide lastBooked={lastBooked} onsubmit={onsubmit} count={empty} />
      {/* <Entry empty={empty} onsubmit={onsubmit} /> */}
      {/* <Floor slots={slots} updateSlot={updateSlot} /> */}
    </Container>
  );
}

export default CarParking;

const Container = styled.div`
  height: 100vh;
  background-color: #fff;
  display: grid;
  grid-template-columns: max-content auto max-content;
`;
