import React from "react";

function Output(props) {
  return (
    <div className="executor__output">
      <div className="output__header">
        <div className="output__heading">Output.txt</div>
      </div>
      <textarea
        className="output__textarea"
        readOnly
        value={props.output}
      ></textarea>
    </div>
  );
}

export default Output;
