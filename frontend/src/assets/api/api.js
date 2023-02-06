const baseURL = "http://localhost:4000";

function handleCode(code, input, setOutput) {
  fetch(`${baseURL}/code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",    // TODO: later uncomment it and add cors for server url later
    body: JSON.stringify({ code: code, input: input, lang: "python" }),
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
      if (d.stderr || d.err) {
        setOutput(d.stderr || d.err);
      } else {
        setOutput(d.stdout);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default handleCode;
