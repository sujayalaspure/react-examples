/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from "react"
import { Card, Container, DateContainer, DateWrapper, FilterWrapper, Name, TimeContainer } from "./style"
import { useEffect } from "react"

const holidayTypes = {
  all: "All",
  Gazetted: "Gazetted Holiday",
  Optional: "Restricted Holiday",
}
const url = "https://calendarific.com/api/v2/holidays?api_key=d829e2cce865463236027fe319641b867d4f5a14&country=IN"

function Holidays() {
  const [holidays, setHolidays] = useState([])
  const [filteredHoliday, setFilteredHoliday] = useState([])

  useEffect(() => {
    console.log(new Date().getFullYear())
    fetch(`${url}&year=${new Date().getFullYear()}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setHolidays(data.response.holidays)
        setFilteredHoliday(data.response.holidays.filter((holiday) => holiday.primary_type === holidayTypes.Gazetted))
      })
      .catch((err) => console.log(err))
  }, [])

  var options = { year: "numeric", month: "short", day: "numeric" }

  const formatDate = useCallback((date) => {
    const dateObj = new Date(date)
    return {
      date: dateObj.toLocaleDateString("en-IN", options),
      day: dateObj.toLocaleDateString("en-IN", { weekday: "short" }),
    }
  }, [])

  const onChangeFilter = (e) => {
    if (e.target.value === holidayTypes.all) {
      setFilteredHoliday(holidays)
    } else {
      setFilteredHoliday(holidays.filter((holiday) => holiday.primary_type === e.target.value))
    }
  }

  return (
    <Container>
      <FilterWrapper>
        <select defaultValue={"Gazetted Holiday"} onChange={onChangeFilter}>
          <option value="All">All</option>
          <option value="Gazetted Holiday">Gazetted</option>
          <option value="Restricted Holiday">Optional</option>
        </select>
      </FilterWrapper>
      {filteredHoliday?.map((holiday, i) => (
        <Card mandatory={holiday?.primary_type === "Gazetted Holiday"} key={i}>
          <Name>{holiday?.name}</Name>
          <DateWrapper>
            <TimeContainer>{formatDate(holiday?.date.iso).day}</TimeContainer>
            <DateContainer>{formatDate(holiday?.date.iso).date}</DateContainer>
          </DateWrapper>
        </Card>
      ))}
      {/* <Footer /> */}
    </Container>
  )
}

export default Holidays
