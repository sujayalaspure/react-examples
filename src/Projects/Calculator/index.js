/* eslint-disable no-eval */
import React, { useState } from "react";
import { BoxWrapper, Button, ButtonWrapper, CalculatorWrapper, Display, OperandsWrapper } from "./style";

function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const getButtons = () => {
    let buttons = [];
    for (let i = 1; i < 10; i++) {
      buttons.push(
        <Button onClick={() => onClick(i)} key={i}>
          {i}
        </Button>
      );
    }
    return buttons;
  };

  const ops = ["+", "-", "*", "/", "."];
  const onClick = (value) => {
    if ((ops.includes(value) && input === "") || (ops.includes(value) && ops.includes(input.slice(-1)))) return;
    setInput((prev) => prev + value);
    // console.log(value);
    if (!ops.includes(value)) setResult(eval(input + value));
  };
  const onSubmit = (e) => {
    // console.log(input);
    setInput(eval(input).toString());
  };

  const del = () => {
    if (!input) return;
    const value = input.slice(0, -1);
    setInput(value.toString());
  };

  return (
    <CalculatorWrapper>
      <BoxWrapper>
        <Display>
          <span>({result || "0"})</span> {input || "0"}
        </Display>
        <OperandsWrapper>
          {ops.map((operator, index) => (
            <Button onClick={() => onClick(operator)} key={index}>
              {operator}
            </Button>
          ))}
        </OperandsWrapper>
        <ButtonWrapper>
          {getButtons()}
          <Button onClick={() => onClick("0")}>0</Button>
          <Button onClick={onSubmit}> {"="}</Button>
          <Button onClick={del}>DEL</Button>
        </ButtonWrapper>
      </BoxWrapper>
    </CalculatorWrapper>
  );
}

export default Calculator;
