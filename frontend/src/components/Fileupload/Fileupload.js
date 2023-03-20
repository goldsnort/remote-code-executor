import React from 'react';

const Fileupload = (props) => {
    let fileReader;
  
  const handleFileRead = (e) => {
      const content = fileReader.result;
      console.log(fileReader.type)
    console.log(content)
    // … do something with the 'content' …
      props.setCode(content);
  };
  
  const handleFileChosen = (file) => {
      var extension = file.name.split('.').pop().toLowerCase();
      console.log(extension);
      switch (extension) {      
       case "cpp":
        props.setSelectedLanguage("cpp");
        props.setMode("c_cpp");
        if (props.socket) {
          props.socket.emit("sendLang", "C++", () =>
            console.log("lang change socket event triggered")
          );
        }
        break;
      case "c":
        props.setSelectedLanguage("cpp");
        props.setMode("c_cpp");
        if (props.socket) {
          props.socket.emit("sendLang","C", () =>
            console.log("lang change socket event triggered")
          );
        }
        break;
      case "java":
        props.setSelectedLanguage("java");
        props.setMode("java");
        if (props.socket) {
          props.socket.emit("sendLang", "Java", () =>
            console.log("lang change socket event triggered")
          );
        }
        break;
      case "py":
        props.setSelectedLanguage("python");
        props.setMode("python");
        if (props.socket) {
          props.socket.emit("sendLang", "Python", () =>
            console.log("lang change socket event triggered")
          );
        }
        break;
      default: return(alert("Upload a file with correct extension"))
        break;
      }
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
      fileReader.readAsText(file);
      
    };
    


    return (
        <div className="fileupload">
            <input type="file" name="codefile"
                onChange={
                    (e) => handleFileChosen(e.target.files[0])}
                    />
        </div>
    )

}

export default Fileupload;