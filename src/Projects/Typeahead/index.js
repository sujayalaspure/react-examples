import React, { useState } from "react"
import { Box, Container, FilterWrapper, HeaderWrapper, InputWrapper, ListItem, StateWrapper } from "./style"
import dummyData from "./dummydata.json"

function Typeahead() {
  const [data, setData] = useState([])
  // const [input, setInput] = useState("");

  const filterData = (searchText) => {
    return dummyData.filter((state) => isStartsWith(state, searchText))
  }

  const isStartsWith = (word, input) => {
    return word.toUpperCase().startsWith(input.toUpperCase())
  }

  const handleChange = (e) => {
    const text = e.target.value
    if (text.length > 0) {
      setData(filterData(text))
    } else {
      setData([])
    }
  }

  const onChangeFilter = (e) => {}

  return (
    <Container>
      <Box>
        <HeaderWrapper>
          <InputWrapper>
            <input placeholder="Search... " onChange={handleChange} />
          </InputWrapper>
          <FilterWrapper>
            <select defaultValue={"Random"} onChange={onChangeFilter}>
              <option value="Random">Random</option>
              <option value="Countries">Countries</option>
              <option value="States">States</option>
            </select>
          </FilterWrapper>
        </HeaderWrapper>
        <StateWrapper>
          {data.map((state, i) => (
            <ListItem delay={i} key={i}>
              {state}
            </ListItem>
          ))}
        </StateWrapper>
      </Box>
    </Container>
  )
}

export default Typeahead
