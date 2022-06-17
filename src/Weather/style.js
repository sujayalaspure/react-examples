import styled from "styled-components";

const colors = {
  background: "#023047",
  secondary: "#8ecae6",
  text: "#bde0fe",
};

export const Wrapper = styled.div`
  background-color: #fff;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

export const BoxWrapper = styled.div`
  background-color: #fff;
  border: 1px dashed ${colors.background};
  min-height: 100px;
  min-width: 300px;
  max-width: 600px;
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
`;

export const Display = styled.div`
  /* background-color: ${colors.secondary}; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.background};
  /* font-size: 2rem; */
  padding: 1rem 0.5rem;
  margin-bottom: 0.5rem;
  padding-right: 3rem;
  /* text-align: right; */
  border-bottom: 1px solid ${colors.secondary};
`;

export const ImageWrapper = styled.div`
  height: 50px;
  width: 50px;
`;

export const LocationWrapper = styled.div`
  h1 {
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 0.9rem;
  }
`;

export const TempWrapper = styled.div`
  span {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

export const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  /* background-color: ${colors.secondary}; */
`;

export const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.6rem;
  /* margin: 0 0.5rem; */
  flex: 1 1 0px;
  h2 {
    margin-bottom: 4px;
  }
  p {
    font-size: 0.8rem;
    text-align: center;
  }
  &:hover {
    background-color: ${colors.secondary}22;
  }
`;

export const SmallIcon = styled.img`
  height: 40px;
  width: 40px;
  margin: 8px 0;
`;

export const InfoImage = styled.img`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;
export const InfoWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${colors.text};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
