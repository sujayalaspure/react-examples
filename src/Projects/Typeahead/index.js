import React, { useState } from "react";
import { Box, Container, InputWrapper, State, StateWrapper } from "./style";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

function Typeahead() {
  const [stateNames, setStateNames] = useState([]);
  // const [input, setInput] = useState("");

  const filterStates = (states, search) => {
    return states.filter((state) => isStartsWith(state, search));
  };

  const isStartsWith = (word, input) => {
    return word.toUpperCase().startsWith(input.toUpperCase());
  };

  const handleChange = (e) => {
    const text = e.target.value;
    if (text.length > 0) {
      setStateNames(filterStates(states, e.target.value));
    } else {
      setStateNames([]);
    }
  };

  return (
    <Container>
      <Box>
        <InputWrapper>
          <input placeholder="Search... " onChange={handleChange} />
        </InputWrapper>
        <StateWrapper>
          {stateNames.map((state) => (
            <State key={state}>{state}</State>
          ))}
        </StateWrapper>
      </Box>
    </Container>
  );
}

export default Typeahead;
