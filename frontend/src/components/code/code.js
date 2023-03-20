import React from "react";
import AceEditor from "react-ace";

import "./code.css";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/ext-language_tools";

const Code = (props) => {
  var handleChange = (newVal) => {
    props.setCode(newVal);
    console.log("newVal: " + newVal);
    console.log("code : " + props.code);
    if (props.socket)
      props.socket.emit("sendCode", newVal, () => console.log("Message sent"));
  };

  const content = (
    <div id="editor">
      <AceEditor
        mode={props.mode}
        width="100%"
        height="100%"
        value={props.code}
        // theme="github"
        fontSize="17px"
        theme="monokai"
        showPrintMargin={false}
        onChange={handleChange}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
      />
    </div>
  );
  return content;
};

export default Code;
