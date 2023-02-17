import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./CodeExecution.css";
import handleCode from "../../assets/api/api";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import Code from "../../components/code/code";
import Output from "../../components/Output/Output";
import Input from "../../components/Input/Input";

const ENDPOINT = "http://localhost:4000";

function CodeExecution() {
  const [code, setCode] = useState("//you can enter your code here");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(
    "Press the run button to see the output"
  );
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [mode, setMode] = useState("c_cpp");
  const [room, setRoom] = useState("1234567891");
  const [userName, setUserName] = useState("");
  const [socket, setSocket] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    if (room && userName) {
      setSocket(io(ENDPOINT));
    }
  }, [room, userName]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", { userName: userName, room: room }, () => {
        setIsSocketConnected(true);
        console.log(userName, room);
      });
      socket.on("joinRoom", (message) => {
        console.log("Join room listen ", message);
        console.log("room id ", room);
      });
      socket.on("sendCode", (message) => {
        console.log(message);
        setCode(message);
      });
      socket.on("sendInput", (message) => {
        console.log(message);
        setInput(message);
      });
      socket.on("sendOutput", (message) => {
        console.log(message);
        setOutput(message);
      });
    }
  }, [socket]);

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
    console.log(room);
    socket.emit("joinRoom", { userName: userName, room: room }, () => {
      console.log(userName, room);
    });
  };

  function runCode(e) {
    e.preventDefault();
    handleCode(code, input, selectedLanguage, setOutput, socket);
  }
  return (
    <div className="executor__page">
      <Navbar />
      <div className="executor__container">
        <section className="executor__code">
          <div className="code__header">
            <button className="code__run" onClick={runCode}>
              Run
            </button>

            <select className="code_language" onChange={handleSubmit}>
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
            {isSocketConnected ? (
              <div className="executor__room">
                <div className="room__container">
                  <div className="room__label">Room Id :</div>
                  <input
                    type="text"
                    className="room__id"
                    value={room}
                    onClick={(e) => {
                      e.target.select();
                    }}
                  />
                  <button
                    className="copy__link"
                    onClick={() => {
                      navigator.clipboard.writeText(room);
                    }}
                  >
                    <span class="material-icons">content_copy</span>
                  </button>
                </div>
                <button
                  className="leave__room"
                  // onClick={createRoom}
                >
                  Leave Room
                </button>
              </div>
            ) : (
              <div className="executor__room">
                <button className="create__room" onClick={createRoom}>
                  Create Room
                </button>
                <button
                  className="join__room"
                  onClick={() => {
                    setUserName(nanoid(15));
                    setRoom("1234");
                  }}
                >
                  Join Room
                </button>
              </div>
            )}
          </div>

          <Code mode={mode} code={code} socket={socket} setCode={setCode} />
        </section>
        <section className="executor__io">
          <Input input={input} setInput={setInput} socket={socket} />
          <Output output={output} />
        </section>
      </div>
    </div>
  );
}

export default CodeExecution;
