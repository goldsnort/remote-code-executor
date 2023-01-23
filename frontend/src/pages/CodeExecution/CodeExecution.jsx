import React, { useState } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Navbar from "../../components/Navbar/Navbar";
import "./CodeExecution.css";
import handleCode from "../../assets/api/api";
import Code from "../../components/code/code";

function CodeExecution() {
  const [code, setCode] = useState("//you can enter your code here");
  const [input, setInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [mode, setMode] = useState("c_cpp");

  function runCode(e) {
    e.preventDefault();
    handleCode(code, input,selectedLanguage);
  }
  return (
    <div className="executor__page">
      <Navbar />
      <div className="executor__container">
        
        <section className="executor__code">
          <div className="code__header">
            <div className="code__heading">Code.cpp</div>

{/* <select className="code_language" name="languages" id="languages"> */}
<select onChange={(e => {
  console.log('this is on change', e);
  setSelectedLanguage(e.target.value)})}>
  <option value="C++">C++</option>
  <option value="C">C</option>
  <option value="Java">Java</option>
  <option value="Python">Python</option>
</select>
            <button className="code__run" onClick={runCode}>
              Run
            </button>
          </div>

          <Code
            mode={mode}
            code={code}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            setCode= {setCode}
                
              />
             
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
