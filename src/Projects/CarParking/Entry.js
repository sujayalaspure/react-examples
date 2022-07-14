import React, { useState } from "react";
import styled from "styled-components";
import Button from "./components/button";
import Input from "./components/Input";

function Entry({ onsubmit, empty }) {
  const [data, setData] = useState({
    carType: "2wheeler",
    entryTime: "",
    carNumber: "",
  });

  const handleChange = (event) => {
    // console.log(event.target.value, event.target.name);
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Container>
      <h1>Entry Form</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onsubmit(data);
        }}>
        <ActionItem>
          <label>Select a Car type</label>
          <Select name="carType" onChange={handleChange}>
            <option value="2wheeler">Motor Cycle</option>
            <option value="small">small</option>
            <option value="medium">Medium</option>
            <option value="Heavy">Heavy</option>
          </Select>
        </ActionItem>

        <ActionItem>
          <label>Car Number</label>
          <Input onChange={handleChange} value={data.carNumber} name="carNumber" placeholder="Car Number" />
        </ActionItem>
        <ActionItem>
          <label>Entry time</label>
          <Input
            name="entryTime"
            value={data.entryTime}
            onChange={handleChange}
            type="datetime-local"
            placeholder="Time"
          />
        </ActionItem>

        <Button type="submit" label={"Submit"} />
        <div className="info">
          Total empty: <span>{empty}</span>
        </div>
      </form>
    </Container>
  );
}

export default Entry;

const Container = styled.div`
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: #fff;
`;

const ActionItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const Select = styled.select`
  background-color: #fff;
  padding: 0.5rem 0;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
