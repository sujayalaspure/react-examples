import React, { useState } from "react";
import styled from "styled-components";

function Entry({ onsubmit, empty }) {
  const [data, setData] = useState({
    carType: "",
    entryTime: "",
  });

  const handleChange = (event) => {
    console.log(event.target.value, event.target.name);
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Container>
      <div className="car-type">
        <label>Select a Car type</label>
        <select name="carType" onChange={handleChange}>
          <option value="2wheeler">Motor Cycle</option>
          <option value="small">small</option>
          <option value="medium">Medium</option>
          <option value="Heavy">Heavy</option>
        </select>
      </div>
      <div className="time entry">
        <label>Entry time</label>
        <input name="entryTime" onChange={handleChange} type="datetime-local" placeholder="Time" />
      </div>
      <button onClick={() => onsubmit(data)} className="button">
        Submit
      </button>
      <div className="info">
        Total empty: <span>{empty}</span>
      </div>
    </Container>
  );
}

export default Entry;

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid gray;
  border-radius: 10px;
`;

const CarType = styled.div``;
