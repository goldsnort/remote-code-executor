const baseURL = "http://localhost:4000";

const outputChange = (d, setOutput, socket) => {
  console.log("output change triggered");
  if (d.stdout || d.stderr || d.err) {
    setOutput(d.stdout || d.stderr || d.err);
    if (socket) {
      socket.emit("sendOutput", d.stdout || d.stderr || d.err, () => {
        console.log("ouput change socket event triggered");
      });
    }
  }
};

function handleCode(code, input, selectedLanguage, setOutput, socket) {
  fetch(`${baseURL}/code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",    //later uncomment it and add cors for server url later
    body: JSON.stringify({
      code: code,
      input: input,
      lang: selectedLanguage,
    }),
  })
    .then((res) => {
      if (res.ok === true) {
        console.log("code execution was successful");
      } else {
        console.log("error!!!");
      }
      return res.json();
    })
    .then((d) => {
      console.log("the output is", d);
      if (d.stdout || d.stderr || d.err) {
        outputChange(d, setOutput, socket);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default handleCode;
