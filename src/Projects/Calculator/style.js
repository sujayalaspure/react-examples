import styled from "styled-components";

const colors = {
  background: "#023047",
  secondary: "#8ecae6",
  text: "#bde0fe",
};

export const CalculatorWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;

  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

export const BoxWrapper = styled.div`
  background-color: #fff;
  min-height: 100px;
  min-width: 300px;
  border-radius: 0.5rem;
  overflow: hidden;
  /* padding: 0.5rem; */
`;

export const Display = styled.div`
  background-color: ${colors.secondary};
  color: ${colors.background};
  font-size: 2rem;
  padding: 0.5rem;
  text-align: right;
  span {
    font-size: 1.2rem;
    opacity: 0.8;
  }
`;
export const OperandsWrapper = styled.div`
  background-color: ${colors.background};
  color: ${colors.text};
  display: flex;
  border-bottom: 1px solid ${colors.secondary};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${colors.secondary};
`;

export const Button = styled.button`
  flex: 1 1 33.33%;
  max-width: 33.33%;
  outline: none;
  padding: 0.75rem;
  appearance: none;
  border: none;
  background-color: transparent;
  /* background-color: ${colors.background}; */
  color: inherit;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    opacity: 0.8;
    background-color: ${colors.text};
    color: ${colors.background};
  }
`;
