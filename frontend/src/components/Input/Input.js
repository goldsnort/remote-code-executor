import React from "react";

function Input(props) {
  const handleChange = (e) => {
    props.setInput(e.target.value);
    if (props.socket) {
      props.socket.emit("sendInput", e.target.value, () =>
        console.log("input change socket event triggered")
      );
    }
  };

  return (
    <div className="executor__input">
      <div className="input__header">
        <div className="input__heading">Input.txt</div>
      </div>
      <textarea
        className="input__textarea"
        placeholder="enter your input here"
        value={props.input}
        onChange={(e) => {
          handleChange(e);
        }}
      ></textarea>
    </div>
  );
}

export default Input;
