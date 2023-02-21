import React from "react";

function Language(props) {
  const onLanguageChange = (e) => {
    e.preventDefault();
    switch (e.target.value) {
      case "C++":
        props.setSelectedLanguage("cpp");
        props.setMode("c_cpp");
        if (props.socket) {
          props.socket.emit("sendLang", e.target.value, () =>
            console.log("lang change socket event triggered")
          );
        }
        break;
      case "C":
        props.setSelectedLanguage("cpp");
        props.setMode("c_cpp");
        if (props.socket) {
          props.socket.emit("sendLang", e.target.value, () =>
            console.log("lang change socket event triggered")
          );
        }
        break;
      case "Java":
        props.setSelectedLanguage("java");
        props.setMode("java");
        if (props.socket) {
          props.socket.emit("sendLang", e.target.value, () =>
            console.log("lang change socket event triggered")
          );
        }
        break;
      case "Python":
        props.setSelectedLanguage("python");
        props.setMode("python");
        if (props.socket) {
          props.socket.emit("sendLang", e.target.value, () =>
            console.log("lang change socket event triggered")
          );
        }
        break;
      default:
        break;
    }
  };
  return (
    <select
      className="code_language"
      onChange={(e) => {
        onLanguageChange(e);
      }}
      // value={props.selectedLanguage}
    >
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
  );
}

export default Language;
