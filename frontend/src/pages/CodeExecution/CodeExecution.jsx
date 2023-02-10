import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./CodeExecution.css";
import handleCode from "../../assets/api/api";
import Code from "../../components/code/code";

function CodeExecution() {
  const [code, setCode] = useState("//you can enter your code here");
  const [input, setInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [mode, setMode] = useState("c_cpp");

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (e.target.value) {
      
      case "C++": setMode("c_cpp");
        break;
      case "C": setMode("c_cpp");
        break;
      case "Java": setMode("java");
        break;
      case "Python": setMode("python");
        break;
      
    }
}

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
            <select onChange={handleSubmit} >
              <option value="C++" name="c_cpp">C++</option>
              <option value="C" name="c_cpp">C</option>
              <option value="Java" name="java">Java</option>
              <option value="Python" name="python">Python</option>
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
