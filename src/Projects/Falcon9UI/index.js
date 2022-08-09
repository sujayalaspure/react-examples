import React from "react";
import { BottomView, Container, Dot, InnerCircle, OuterCircle } from "./style";

function FalconUI() {
  return (
    <Container>
      <BottomView>
        <OuterCircle>
          <InnerCircle>
            <Dot />
            <Dot />
          </InnerCircle>
        </OuterCircle>
      </BottomView>
    </Container>
  );
}

export default FalconUI;
