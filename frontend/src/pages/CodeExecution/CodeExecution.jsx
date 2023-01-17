import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./CodeExecution.css";

function CodeExecution() {
  return (
    <div className="executor__page">
      <Navbar />
      <div className="executor__container">
        <section className="executor__code">
          <div className="code__heading">Code.cpp</div>
          <textarea className="code__textarea">
            //you can enter your code here
          </textarea>
        </section>
        <section className="executor__io">
          <div className="executor__input">
            <div className="input__heading">Input.txt</div>
            <textarea className="input__textarea">
              enter your input here
            </textarea>
          </div>
          <div className="executor__output">
            <div className="output__heading">Output.txt</div>
            <textarea className="output__textarea" readOnly>
              press run to see your output
            </textarea>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CodeExecution;
