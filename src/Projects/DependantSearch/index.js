import React, { useState } from "react"
import { Box, Container, HeaderWrapper, InputWrapper, ListItem, StateWrapper } from "./style"
import dummyData from "./contries.json"

function DependantSearch() {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [stateData, setStateData] = useState([])
  const [currentFilterData, setCurrentFilterData] = useState([])

  const isStartsWith = (word, input) => word.toUpperCase().startsWith(input.toUpperCase())

  const handleCountryChange = (e) => {
    const text = e.target.value
    setSelectedCountry(text)
    if (text.length > 0) {
      setCurrentFilterData(
        dummyData.countries.filter((state) => isStartsWith(state.country, text)).map((i) => i.country)
      )
    } else {
      setCurrentFilterData([])
    }
  }

  const onStateSearch = (e) => {
    const text = e.target.value
    if (text.length > 0) {
      setCurrentFilterData(stateData.filter((state) => isStartsWith(state, text)))
    } else {
      setCurrentFilterData([])
    }
  }

  const onSelectCountry = (country) => {
    console.log(country)
    setSelectedCountry(country)
    setStateData(dummyData.countries.find((i) => i.country === country).states)
    setCurrentFilterData([])
  }

  return (
    <Container>
      <Box>
        <HeaderWrapper>
          <InputWrapper>
            <input placeholder="Search Country " onChange={handleCountryChange} value={selectedCountry} />
          </InputWrapper>
          {selectedCountry && (
            <InputWrapper>
              <input placeholder="Search State " onChange={onStateSearch} />
            </InputWrapper>
          )}
        </HeaderWrapper>
        <StateWrapper>
          {currentFilterData.map((state, i) => (
            <ListItem
              delay={i}
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                onSelectCountry(state)
              }}
            >
              {state}
            </ListItem>
          ))}
        </StateWrapper>
      </Box>
    </Container>
  )
}

export default DependantSearch
