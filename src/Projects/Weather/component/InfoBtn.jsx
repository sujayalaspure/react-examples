import React, {useState} from "react"
import styled from "styled-components"
import {colors} from "../style"

function InfoBtn() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <InfoWrapper>
      <img
        onClick={() => setShowInfo((prev) => !prev)}
        src="https://img.icons8.com/material-outlined/24/000000/info--v1.png"
        alt="Show Info"
      />
      {showInfo && <Info />}
    </InfoWrapper>
  )
}

export default InfoBtn

const Info = () => {
  return (
    <div>
      <span>
        Please enter the <b>lattitude</b> and <b>longitude</b> of the city you want to get the weather in the url param.
      </span>
      <p>
        ex: <span>weather?l=19.0760,72.8777&city=mumbai&type=v1</span>
      </p>
    </div>
  )
}

const InfoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${colors.text};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.3s ease-in-out;
`
