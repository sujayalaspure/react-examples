import styled from "styled-components";
import COLORS from "../../utils/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin-bottom: 10%;
`;

export const FilterWrapper = styled.div`
  width: 90%;
  max-width: 300px;
  select {
    background-color: aliceblue;
    padding: 12px;
    margin: 4px 0;
    border-radius: 4px;
    width: 100%;
    /* border: 0; */
  }
`;
export const Card = styled.div`
  background-color: aliceblue;
  padding: 8px 12px;
  margin: 4px 0;
  border-radius: 4px;
  width: 90%;
  max-width: 300px;
  display: grid;
  grid-template-columns: 60% 40%;
  align-items: center;
  /* justify-content: space-between; */
  border-left: 4px solid;
  border-left-color: ${(_) => (_.mandatory ? COLORS.orange : "aliceblue")};
`;
export const Name = styled.div``;
export const DateWrapper = styled.div`
  /* flex: 0.5; */
  font-size: 14px;
  color: ${COLORS.greyDark1};
  display: flex;
  flex-direction: column;
  /* background-color: yellow; */
  overflow: scroll;
  align-items: flex-end;
  overflow: hidden;
`;
export const DateContainer = styled.div`
  font-size: inherit;
  color: inherit;
  overflow: hidden;
`;
export const TimeContainer = styled.div`
  font-size: inherit;
  color: inherit;
`;
