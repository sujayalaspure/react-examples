import React, { useState } from "react";
import { InputWrapper } from "./style";

function InputBox({ onPostReply }) {
  const [inputData, setInputData] = useState("");
  const handleChange = (e) => {
    const text = e.target.value;
    if (text) setInputData(text);
  };
  return (
    <InputWrapper onSubmit={() => onPostReply(inputData)}>
      <input autoFocus onChange={handleChange} type="text" placeholder="Write a comment..." />
      <button type="submit">Post</button>
    </InputWrapper>
  );
}

export default InputBox;
