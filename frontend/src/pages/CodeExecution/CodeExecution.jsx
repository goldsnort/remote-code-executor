import React, { useState, useEffect} from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./CodeExecution.css";
import handleCode from "../../assets/api/api";
import io from "socket.io-client";
import { nanoid } from 'nanoid'
import Code from "../../components/code/code";



const ENDPOINT = "http://localhost:4000"

const socket = io(ENDPOINT);

// io.on("connection", (socket) => {
//   socket.join("some room");
// });

socket.on("connection", (socket) => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});


function CodeExecution() {
  
  const [code, setCode] = useState("//you can enter your code here");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(
    "Press the run button to see the output"
  );
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [mode, setMode] = useState("c_cpp");
  const [roomID, setRoomID] = useState("");
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
   
    // socket.emit("join", ( "room 1" ))
   
  }, []);
  
  useEffect(() => {
    socket.on("sendCode", (message) => {
      console.log(message)
      setCode(message);
    });
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (e.target.value) {
      case "C++":
        setSelectedLanguage("cpp");
        setMode("c_cpp");
        break;
      case "C":
        setMode("c_cpp");
        break;
      case "Java":
        setSelectedLanguage("java");
        setMode("java");
        break;
      case "Python":
        setSelectedLanguage("python");
        setMode("python");
        break;
      default:
        break;
    }
  };

  const createRoom = () => {
    setUserName(nanoid(15));
    setRoomID(nanoid(10));
    socket.emit("joinRoom",{userName: userName, roomID: roomID},() => {
      console.log(userName,roomID);
    });
  }


  function runCode(e) {
    e.preventDefault();
    handleCode(code, input, selectedLanguage, setOutput);
  }
  return (
    <div className="executor__page">
      <Navbar />
      <div className="executor__container">
        <section className="executor__code">
          <div className="code__header">
            <div className="code__heading">Code.cpp</div>

            {/* <select className="code_language" name="languages" id="languages"> */}
            <select onChange={handleSubmit}>
              <option value="C++" name="c_cpp">
                C++
              </option>
              <option value="C" name="c_cpp">
                C
              </option>
              <option value="Java" name="java">
                Java
              </option>
              <option value="Python" name="python">
                Python
              </option>
            </select>
            <button className="create__room"
              onClick={createRoom}
            >
              Create Room
            </button>
            <button className="join__room" >
              Join Room
            </button>
            <button className="code__run" onClick={createRoom}>
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
            socket={socket}
            setCode={setCode}
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
              value={output}
            ></textarea>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CodeExecution;
