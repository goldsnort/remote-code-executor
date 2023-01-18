import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./CodeExecution.css";
import handleCode from "../../assets/api/api";

function CodeExecution() {
  const [code, setCode] = useState("//you can enter your code here");
  const [input, setInput] = useState("");

  function runCode(e) {
    e.preventDefault();
    handleCode(code, input);
  }

  return (
    <div className="executor__page">
      <Navbar />
      <div className="executor__container">
        <section className="executor__code">
          <div className="code__header">
            <div className="code__heading">Code.cpp</div>
            <button className="code__run" onClick={runCode}>
              Run
            </button>
          </div>
          <textarea
            className="code__textarea"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></textarea>
        </section>
        <section className="executor__io">
          <div className="executor__input">
            <div className="input__header">
              <div className="input__heading">Input.txt</div>
            </div>
            <textarea
              className="input__textarea"
              placeholder="enter your input here"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="executor__output">
            <div className="output__header">
              <div className="output__heading">Output.txt</div>
            </div>
            <textarea
              className="output__textarea"
              readOnly
              value="press run to see your output"
            ></textarea>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CodeExecution;
