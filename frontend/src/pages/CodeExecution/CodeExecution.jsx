import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./CodeExecution.css";
import handleCode from "../../assets/api/api";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import Code from "../../components/code/code";
import Output from "../../components/Output/Output";
import Input from "../../components/Input/Input";
import Language from "../../components/Language/Language";
import Fileupload from "../../components/Fileupload/Fileupload";

const ENDPOINT = "http://localhost:4000";

function CodeExecution() {
  const [code, setCode] = useState("//you can enter your code here");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(
    "Press the run button to see the output"
  );
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [mode, setMode] = useState("c_cpp");
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [socket, setSocket] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [modal, setModal] = useState(false);
  let newUser = true;
  const roomInput = useRef("");

  useEffect(() => {
    if (room && userName) {
      setIsSocketConnected(true);
      setSocket(io(ENDPOINT));
    }
  }, [room, userName]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", { userName: userName, room: room }, () => {
        console.log(userName, room);
      });
      socket.on("joinRoom", (message) => {
        console.log("Join room listen ", message, code);
        console.log("room id ", room);
        // if (newUser) {
        //   console.log("The user is new: ", newUser);
        //   newUser = false;
        // } else {
        //   console.log("The user is newwala: ", newUser, code);
        //   socket.emit("sendCode", code, () => {
        //     console.log("this is the code emitted by old user", code);
        //   });
        //   socket.emit("sendInput", input, (message) => {
        //     console.log(message);
        //   });
        //   socket.emit("sendLang", selectedLanguage, (message) => {
        //     console.log(message);
        //   });
        //   socket.emit("sendOutput", output, (message) => {
        //     console.log(message);
        //   });
        // }
      });
      socket.on("sendCode", (message) => {
        console.log(message);
        setCode(message);
      });
      socket.on("sendInput", (message) => {
        console.log(message);
        setInput(message);
      });
      socket.on("sendLang", (message) => {
        console.log(message);
        setSelectedLanguage(message);
      });
      socket.on("sendOutput", (message) => {
        console.log(message);
        setOutput(message);
      });
    }
  }, [socket]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const joinRoom = (e) => {
    e.preventDefault();
    console.log("join room");
    if (roomInput.current.value && roomInput.current.value.length === 10) {
      setRoom(roomInput.current.value);
      setUserName(nanoid(15));
    } else console.log("invalid room id");
    setModal(!modal);
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom", { userName: userName, room: room }, () => {
      console.log(userName, room);
    });
    socket.off("joinRoom");
    socket.off("sendCode");
    socket.off("sendInput");
    socket.off("sendOutput");
    socket.off("sendLang");
    socket.disconnect();
    setIsSocketConnected(false);
    setSocket(null);
    setRoom("");
    setUserName("");
  };

  function runCode(e) {
    e.preventDefault();
    handleCode(code, input, selectedLanguage, setOutput, socket);
  }

  return (
    <div className="executor__page">
      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal__content">
            <input ref={roomInput} type="text" placeholder="Enter Room Id" />
            <button onClick={joinRoom}>Join</button>
          </div>
        </div>
      )}
      <Navbar />
      <div className="executor__container">
        <section className="executor__code">
          <div className="code__header">
            <button className="code__run" onClick={runCode}>
              Run
            </button>
            <Fileupload
              setCode={setCode}
              setSelectedLanguage={setSelectedLanguage}
              setMode={setMode}            
            />
            
            <Language
              selectedLanguage={selectedLanguage}
              socket={socket}
              setMode={setMode}
              setSelectedLanguage={setSelectedLanguage}
            />
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
                    <span className="material-icons">content_copy</span>
                  </button>
                </div>
                <button className="leave__room" onClick={leaveRoom}>
                  Leave Room
                </button>
              </div>
            ) : (
              <div className="executor__room">
                <button
                  className="create__room"
                  onClick={() => {
                    setUserName(nanoid(15));
                    setRoom(nanoid(10));
                    newUser = false;
                  }}
                >
                  Create Room
                </button>
                <button className="join__room" onClick={toggleModal}>
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
